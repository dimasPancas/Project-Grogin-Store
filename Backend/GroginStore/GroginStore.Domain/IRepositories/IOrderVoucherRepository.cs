using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories;

public interface IOrderVoucherRepository
{
    Task AddOrderVoucher(OrderVoucher data);
}
