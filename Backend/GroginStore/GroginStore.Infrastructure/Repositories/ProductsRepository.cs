
using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly ApplicationDbContext context;
        public ProductsRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<(IEnumerable<Product>, int)> AdminGetAllMatchingProducts(string? search, int pageSize,
            int pageNumber, bool? isActive, string? CategoryId, string? sortBy, SortDirection sortDirection)
        {
            var searchLower = search?.ToLower();
            var baseQuery = context.Products.Include(p => p.Category).AsQueryable();

            // Filter berdasarkan IsActive jika nilai isActive telah disediakan
            if (isActive.HasValue)
            {
                baseQuery = baseQuery.Where(p => p.IsActive == isActive.Value);
            }

            // Filter berdasarkan CategoryId jika ada nilai CategoryId
            if (!string.IsNullOrWhiteSpace(CategoryId))
            {
                baseQuery = baseQuery.Where(p => p.CategoryId.ToString() == CategoryId);
            }

            // Filter berdasarkan search jika ada nilai search
            if (!string.IsNullOrWhiteSpace(searchLower))
            {
                baseQuery = baseQuery.Where(p => p.Name.ToLower().Contains(searchLower) || p.Description.ToLower().Contains(searchLower));
            }

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                switch (sortBy.ToLower())
                {
                    case "name":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Name) :
                            baseQuery.OrderByDescending(p => p.Name);
                        break;
                    case "price":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Price) :
                            baseQuery.OrderByDescending(p => p.Price);
                        break;
                    case "createddate":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.CreatedDate) :
                            baseQuery.OrderByDescending(p => p.CreatedDate);
                        break;
                    case "stock":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Stock) :
                            baseQuery.OrderByDescending(p => p.Stock);
                        break;
                    default:
                        // Sort by Name by default if sortBy is not recognized
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Name) :
                            baseQuery.OrderByDescending(p => p.Name);
                        break;
                }
            }

            var totalCount = await baseQuery.CountAsync();

            // Lakukan paginasi dan ambil data produk
            var products = await baseQuery
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return (products, totalCount);
        }



        public async Task<Product?> AdminGetProductById(string id)
        {
            var product = await context.Products.Include(p => p.Category).Include(p => p.UserAdmin).FirstOrDefaultAsync(p => p.Id.ToString() == id);
            if (product == null) return null;
            return product;
        }

        public async Task<Product> CreateProduct(Product data)
        {
            await context.Products.AddAsync(data);
            await context.SaveChangesAsync();
            return data;
        }

        public async Task<(IEnumerable<Product>, int)> GetAllMatchingProducts(string? search, int pageSize,
      int pageNumber, string? sortBy, SortDirection sortDirection, string? CategoryId)
        {
            var searchLower = search?.ToLower();
            var baseQuery = context.Products
                .Where(p => (searchLower == null
                             || p.Name.ToLower().Contains(searchLower)
                             || p.Description.ToLower().Contains(searchLower))
                             && p.IsActive); // hanya produk dengan IsActive = true

            // Filter berdasarkan CategoryId jika ada nilai CategoryId
            if (!string.IsNullOrWhiteSpace(CategoryId))
            {
                baseQuery = baseQuery.Where(p => p.CategoryId.ToString() == CategoryId);
            }

            var totalCount = await baseQuery.CountAsync();

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                switch (sortBy.ToLower())
                {
                    case "name":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Name) :
                            baseQuery.OrderByDescending(p => p.Name);
                        break;
                    case "price":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Price) :
                            baseQuery.OrderByDescending(p => p.Price);
                        break;
                    case "createddate":
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.CreatedDate) :
                            baseQuery.OrderByDescending(p => p.CreatedDate);
                        break;
                    default:
                        // Sort by Name by default if sortBy is not recognized
                        baseQuery = sortDirection == SortDirection.Ascending ?
                            baseQuery.OrderBy(p => p.Name) :
                            baseQuery.OrderByDescending(p => p.Name);
                        break;
                }
            }

            var products = await baseQuery
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return (products, totalCount);
        }



        public async Task<Product?> GetDetailProduct(string id)
        {
            var product = await context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id.ToString() == id);
            if (product == null) return null;
            return product;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }

    }
}
