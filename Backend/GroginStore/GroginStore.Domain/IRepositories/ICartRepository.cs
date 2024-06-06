using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart?>?> GetCartItemsByUserId(string userId);
        Task<Cart> AddToCart(Cart cart);
        Task<Cart?> GetCartById(string id);
        Task<Cart?> GetItemsCartExist(string userId, string productId);
        Task DeleteCart(Cart cart);
        Task SaveChanges();
    }
}
