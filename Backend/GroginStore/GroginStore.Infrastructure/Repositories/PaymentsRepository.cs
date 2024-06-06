using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class PaymentsRepository : IPaymentsRepository
    {
        private readonly ApplicationDbContext context;

        public PaymentsRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Payment>> AdminGetAllPayments(bool? isActive)
        {
            if (!isActive.HasValue)
            {
                return await context.Payments.ToListAsync();
            }
            else if (isActive.Value)
            {
                return await context.Payments.Where(c => c.IsActive).ToListAsync();
            }
            else
            {
                return await context.Payments.Where(c => !c.IsActive).ToListAsync();
            }
        }

        public async Task<Payment> CreatePayment(Payment data)
        {
            await context.Payments.AddAsync(data);
            await context.SaveChangesAsync();
            return data;
        }


        public async Task<IEnumerable<Payment>> GetAllPayments()
        {
            return await context.Payments.Where(p => p.IsActive).ToListAsync();
        }

        public async Task<Payment?> GetPaymentById(string id)
        {
            var payment = await context.Payments.Include(p => p.UserAdmin).Where(c => c.Id.ToString() == id).FirstOrDefaultAsync();
            if (payment == null) return null;
            return payment;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
