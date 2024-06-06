using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories;

public class UserVoucherClaimRepository : IUserVoucherRepository
{
    private readonly ApplicationDbContext context;

    public UserVoucherClaimRepository(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task CreateVoucherUserClaim(UserVoucher data)
    {
        await context.UserVouchers.AddAsync(data);
        await context.SaveChangesAsync();
    }

    public async Task<bool> HasUserClaimedVoucher(string userId, string voucherId)
    {
        return await context.UserVouchers.AnyAsync(uv => uv.UserId == userId && uv.VoucherId.ToString() == voucherId);
    }

    public async Task RemoveVoucherAfterClaim(string userId, string voucherId)
    {
        var voucher = await context.UserVouchers.FirstOrDefaultAsync(uv => uv.VoucherId.ToString() == voucherId && uv.UserId == userId);
        if(voucher != null) context.Remove(voucher);
        await context.SaveChangesAsync();
    }
}
