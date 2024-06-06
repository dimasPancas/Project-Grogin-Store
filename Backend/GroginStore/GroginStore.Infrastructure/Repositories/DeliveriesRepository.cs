using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class DeliveriesRepository : IDeliveriesRepository
    {
        private readonly ApplicationDbContext context;

        public DeliveriesRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Delivery>> AdminGetAllDeliveries(bool? isActive)
        {
            if (!isActive.HasValue)
            {
                return await context.Deliveries.ToListAsync();
            }
            else if (isActive.Value)
            {
                return await context.Deliveries.Where(c => c.IsActive).ToListAsync();
            }
            else
            {
                return await context.Deliveries.Where(c => !c.IsActive).ToListAsync();
            }
        }

        public async Task<Delivery> CreateDelivery(Delivery data)
        {
            await context.Deliveries.AddAsync(data);
            await context.SaveChangesAsync();
            return data;
        }

        public async Task<IEnumerable<Delivery>> GetAllDeliveries()
        {
            return await context.Deliveries.Where(c => c.IsActive).ToListAsync();
        }

        public async Task<Delivery?> GetDeliveryById(string id)
        {
            var delivery = await context.Deliveries.Include(d => d.UserAdmin).Where(c => c.Id.ToString() == id).FirstOrDefaultAsync();
            if (delivery == null) return null;
            return delivery;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
