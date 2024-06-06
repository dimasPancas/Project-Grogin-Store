using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly ApplicationDbContext context;

        public WishlistRepository(ApplicationDbContext context)
        {
            this.context = context;
        }


        public async Task AddWishlist(Wishlist wishlist)
        {
            await context.Wishlists.AddAsync(wishlist);
            await context.SaveChangesAsync();
        }

        public async Task<bool> DeleteWishlist(string id)
        {
            var wishlist = await context.Wishlists.FirstOrDefaultAsync(w => w.Id.ToString() == id);
            if (wishlist == null) return false;
            context.Wishlists.Remove(wishlist);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Wishlist?>?> GetAllWishlistByUserId(string userId)
        {
            var wishlistItem = await context.Wishlists.Where(w => w.UserId == userId).Include(w => w.Product).ThenInclude(p => p.Category).ToListAsync();
            if (wishlistItem.Any()) return wishlistItem;
            return null;
        }
    }
}
