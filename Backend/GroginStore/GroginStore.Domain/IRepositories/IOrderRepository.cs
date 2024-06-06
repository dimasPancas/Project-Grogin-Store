using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IOrderRepository
    {

        //query
        Task<IEnumerable<Order>> GetAllOrdersByUserId(string userId, int? orderStatus);
        Task<IEnumerable<Order>> GetDetailOrderById(string id);

        Task<IEnumerable<Order>> GetAllOrders(int? orderStatus);


        //command
        Task<Order> CreateOrder(Order order);
        Task<bool> UpdateOrderPaymentVerficationCode(string id, string paymentCode);
        Task<Order?> GetOrderByOrderId(string orderId);
        Task<Order?> UpdateOrderStatus(string id, int status);
        Task DeleteOrderCanceled(string id);
        Task SaveChanges();
    }
}
