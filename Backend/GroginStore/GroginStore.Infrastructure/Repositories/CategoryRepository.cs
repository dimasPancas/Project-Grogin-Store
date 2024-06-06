using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext context;

        public CategoryRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Category>> AdminGetAllCategories(bool? isActive)
        {
            if (!isActive.HasValue)
            {
                return await context.Categories.ToListAsync();
            }
            else if (isActive.Value)
            {
                return await context.Categories.Where(c => c.IsActive).ToListAsync();
            }
            else
            {
                return await context.Categories.Where(c => !c.IsActive).ToListAsync();
            }
        }

        public async Task<Category> CreateCategory(Category data)
        {
            await context.Categories.AddAsync(data);
            await context.SaveChangesAsync();
            return data;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await context.Categories.Where(c => c.IsActive).ToListAsync();
        }

        public async Task<Category?> GetCategoryById(string id)
        {
            var category = await context.Categories.Where(c => c.Id.ToString() == id).FirstOrDefaultAsync();
            if (category == null) return null;
            return category;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
