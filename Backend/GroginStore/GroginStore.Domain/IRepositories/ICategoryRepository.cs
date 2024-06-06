using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategories();
    Task<IEnumerable<Category>> AdminGetAllCategories(bool? isActive);
    Task<Category?> GetCategoryById(string id);
    Task<Category> CreateCategory(Category data);
    Task SaveChanges();
}
