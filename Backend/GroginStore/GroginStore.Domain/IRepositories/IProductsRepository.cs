using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IProductsRepository
    {
        Task<(IEnumerable<Product>, int)> GetAllMatchingProducts(
            string? search, int pageSize, int pageNumber, string? sortBy, SortDirection sortDirection, string? CategoryId);

        Task<(IEnumerable<Product>, int)> AdminGetAllMatchingProducts(
            string? search, int pageSize, int pageNumber, bool? isActive, string? CategoryId, string? sortBy, SortDirection sortDirection);

        Task<Product?> GetDetailProduct(string id);

        //admin
        Task<Product?> AdminGetProductById(string id);
        Task<Product> CreateProduct(Product data);
        Task SaveChanges();
    }
}
