using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly ApplicationDbContext context;

        public OrderDetailRepository(ApplicationDbContext context)
        {
            this.context = context;
        }


        public async Task CreateOrderDetail(OrderDetail data)
        {
            await context.OrderDetails.AddAsync(data);  
            await context.SaveChangesAsync();
        }

        public async Task DeleteOrderDetailCanceled(OrderDetail orderDetail)
        {
            context.OrderDetails.Remove(orderDetail);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetailByOrderId(string id)
        {
            var ordersDetail = await context.OrderDetails.Where(od => od.OrderId.ToString() == id).ToListAsync();
            return ordersDetail;
        }
    }
}
