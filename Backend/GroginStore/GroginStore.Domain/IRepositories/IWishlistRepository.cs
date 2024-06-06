using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IWishlistRepository
    {
        Task<IEnumerable<Wishlist?>?> GetAllWishlistByUserId(string userId);
        Task AddWishlist(Wishlist wishlist);
        Task<bool> DeleteWishlist(string id);
    }
}
