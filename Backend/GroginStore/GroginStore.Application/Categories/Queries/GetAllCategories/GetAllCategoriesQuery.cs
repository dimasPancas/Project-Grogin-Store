using GroginStore.Application.Categories.DTOs;
using MediatR;

namespace GroginStore.Application.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
    {

    }
}
