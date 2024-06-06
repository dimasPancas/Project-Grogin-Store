using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace GroginStore.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext context;

        public OrderRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Order> CreateOrder(Order order)
        {
            await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<Order>> GetDetailOrderById(string id)
        {
            var orderDetail = await context.Orders.Where(o => o.Id.ToString() == id)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                    .ThenInclude(od => od!.Category)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Comment)
                .Include(o => o.Payment)
                .Include(o => o.Addres)
                .Include(o => o.Delivery)
                .Include(o => o.User)
                .Include(o => o.OrderVouchers!)
                    .ThenInclude(ov => ov.Voucher)
                .ToListAsync();

            return orderDetail;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersByUserId(string userId, int? orderStatus)
        {
            IQueryable<Order> query = context.Orders.Include(o => o.Delivery);

            query = query.Where(o => o.UserId == userId);

            if (orderStatus.HasValue)
            {
                query = query.Where(o => o.OrderStatus == orderStatus.Value);
            }

            var orders = await query.ToListAsync();
            return orders;
        }

        public async Task<bool> UpdateOrderPaymentVerficationCode(string id, string paymentCode)
        {
            var order = await context.Orders.FirstOrDefaultAsync(o => o.Id.ToString() == id);
            if (order == null) return false;
            order.PaymentVerificationCode = paymentCode;
            order.PaymentVerified = true;
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Order?> UpdateOrderStatus(string id, int status)
        {
            var order = await context.Orders.FirstOrDefaultAsync(o => o.Id.ToString() == id);
            if (order == null) return null;
            order.OrderStatus = status;
            await context.SaveChangesAsync();
            return order;
        }

        public async Task DeleteOrderCanceled(string id)
        {
            var order = await context.Orders.FirstOrDefaultAsync(o => o.Id.ToString() == id);
            context.Orders.Remove(order!);
            await context.SaveChangesAsync();
        }

        public async Task<Order?> GetOrderByOrderId(string orderId)
        {
            var order = await context.Orders.FirstOrDefaultAsync(o => o.Id.ToString() == orderId);
            if (order == null) return null;
            return order;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrders(int? orderStatus)
        {
            IQueryable<Order> query = context.Orders.Include(o => o.Delivery).Include(o => o.User);

            if (orderStatus.HasValue)
            {
                query = query.Where(o => o.OrderStatus == orderStatus.Value);
            }

            var orders = await query.ToListAsync();
            return orders;
        }

    }
}
