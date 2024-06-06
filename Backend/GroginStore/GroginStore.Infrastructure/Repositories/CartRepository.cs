using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext context;

        public CartRepository(ApplicationDbContext context)
        {
            this.context = context;
        }


        public async Task<Cart> AddToCart(Cart cart)
        {
            await context.Carts.AddAsync(cart);
            await context.SaveChangesAsync();
            return cart;
        }

        public async Task DeleteCart(Cart cart)
        {
            context.Carts.Remove(cart);
            await context.SaveChangesAsync();
        }

        public async Task<Cart?> GetCartById(string id)
        {
            var cart = await context.Carts.FirstOrDefaultAsync(c => c.Id.ToString() == id);
            if (cart == null) return null;
            return cart;
        }

        public async Task<IEnumerable<Cart?>?> GetCartItemsByUserId(string userId)
        {
            var cartsItems = await context.Carts.Where(c => c.UserId!.ToString() == userId).Include(c => c.Product).ToListAsync();
            if (cartsItems.Any()) return cartsItems;
            return null;
        }

        public async Task<Cart?> GetItemsCartExist(string userId, string productId)
        {
            var cartExist = await context.Carts.Where(c => c.UserId == userId && c.ProductId.ToString() == productId).FirstOrDefaultAsync();
            if (cartExist == null) return null;
            return cartExist;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
