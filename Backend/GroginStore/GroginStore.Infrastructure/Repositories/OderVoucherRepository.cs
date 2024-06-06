
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;

namespace GroginStore.Infrastructure.Repositories;

public class OderVoucherRepository : IOrderVoucherRepository
{
    private readonly ApplicationDbContext context;

    public OderVoucherRepository(ApplicationDbContext context)
    {
        this.context = context;
    }
    public async Task AddOrderVoucher(OrderVoucher data)
    {
        await context.OrderVouchers.AddAsync(data);
        await context.SaveChangesAsync();
    }
}
