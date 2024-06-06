using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class AdressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext context;

        public AdressRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Addres> CreateAddress(Addres data)
        {
            await context.Addresses.AddAsync(data);
            await context.SaveChangesAsync();
            return data;
        }

        public async Task<IEnumerable<Addres?>?> GetAllAddressByUserId(string userId)
        {
            var addresses = await context.Addresses.Where(c => c.IsActive && c.UserId == userId).ToListAsync();
            if (addresses.Any()) return addresses;
            return null;
        }

        public async Task<Addres?> GetDetailAddresById(string id)
        {
            var address = await context.Addresses.Where(c => c.Id.ToString() == id && c.IsActive).FirstOrDefaultAsync();
            if (address == null) return null;
            return address;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
