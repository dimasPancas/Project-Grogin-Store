using GroginStore.Application.Categories.DTOs;
using MediatR;

namespace GroginStore.Application.Categories.Queries.AdminGetAllCategories;

public class AdminGetAllCategoriesQuery : IRequest<IEnumerable<AdminCategoryDto>>
{
    public bool? IsActive { get; set; }
}
