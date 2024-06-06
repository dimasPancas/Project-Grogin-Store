using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IOrderDetailRepository
    {
        Task CreateOrderDetail(OrderDetail data);

        Task<IEnumerable<OrderDetail>> GetAllOrderDetailByOrderId(string id);

        Task DeleteOrderDetailCanceled(OrderDetail orderDetail);
    }
}
