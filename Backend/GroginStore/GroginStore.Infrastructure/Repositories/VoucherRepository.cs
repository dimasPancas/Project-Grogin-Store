using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories;

public class VoucherRepository : IVoucherRepository
{
    private readonly ApplicationDbContext context;

    public VoucherRepository(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task<(IEnumerable<Voucher>? FreeShipping, IEnumerable<Voucher>? VoucherDiscount, IEnumerable<Voucher>? VoucherPercentage)> CustomerGetAllVouchers(string userId)
    {
        var currentDateTime = DateTime.Now;

        var userVouchers = context.UserVouchers
            .Include(uv => uv.Voucher)
            .Where(uv => uv.UserId == userId && uv.Voucher!.IsActive && (!uv.Voucher.ExpiryDate.HasValue || uv.Voucher.ExpiryDate > currentDateTime));

        var freeShippingVouchers = await userVouchers
            .Where(uv => uv.Voucher!.Type == VoucherType.FreeShipping)
            .Select(uv => uv.Voucher)
            .ToListAsync();

        var percentageVouchers = await userVouchers
            .Where(uv => uv.Voucher!.Type == VoucherType.Percentage)
            .Select(uv => uv.Voucher)
            .ToListAsync();

        var discountVouchers = await userVouchers
            .Where(uv => uv.Voucher!.Type == VoucherType.Fixed)
            .Select(uv => uv.Voucher)
            .ToListAsync();

        // Mengatur hasil menjadi null jika tidak ada voucher dari jenis tertentu
        return (
            FreeShipping: freeShippingVouchers.Count != 0 ? freeShippingVouchers : null,
            VoucherDiscount: discountVouchers.Count != 0 ? discountVouchers : null,
            VoucherPercentage: percentageVouchers.Count != 0 ? percentageVouchers : null
        );
    }

    public async Task<IEnumerable<Voucher>> AdminGetAllVoucher(VoucherType? type, bool? isActive)
    {
        IQueryable<Voucher> query = context.Vouchers;

        if (type.HasValue)
        {
            query = query.Where(v => v.Type == type.Value);
        }

        if (isActive.HasValue)
        {
            query = query.Where(v => v.IsActive == isActive.Value);
        }

        var vouchers = await query.ToListAsync();
        return vouchers;
    }


    public async Task CreateVoucher(Voucher voucher)
    {
        await context.Vouchers.AddAsync(voucher);
        await context.SaveChangesAsync();
    }

    public async Task<Voucher?> GetVoucherById(string voucherId)
    {
        var voucher = await context.Vouchers.FirstOrDefaultAsync(v => v.Id.ToString() == voucherId);
        if (voucher == null) return null;
        return voucher;
    }

    public async Task SaveChanges()
    {
        await context.SaveChangesAsync();
    }

    public async Task<(IEnumerable<Voucher>? FreeShipping, IEnumerable<Voucher>? VoucherDiscount, IEnumerable<Voucher>? VoucherPercentage)> CustomerGetAvailableVouchers(string userId)
    {
        async Task<List<Voucher>> GetVouchersByType(VoucherType type)
        {
            return await context.Vouchers
                .Where(v => !context.UserVouchers
                    .Any(uv => uv.UserId == userId && uv.VoucherId == v.Id))
                .Where(v => v.Type == type)
                .ToListAsync();
        }

        var freeShippingVouchers = await GetVouchersByType(VoucherType.FreeShipping);
        var percentageVouchers = await GetVouchersByType(VoucherType.Percentage);
        var discountVouchers = await GetVouchersByType(VoucherType.Fixed);

        return (
            FreeShipping: freeShippingVouchers.Any() ? freeShippingVouchers : null,
            VoucherDiscount: discountVouchers.Any() ? discountVouchers : null,
            VoucherPercentage: percentageVouchers.Any() ? percentageVouchers : null
        );
    }
}
