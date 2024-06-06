using GroginStore.Application.Categories.DTOs;
using MediatR;

namespace GroginStore.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : IRequest<CategoryDto>
    {
        public string? Id { get; set; }
        public string Name { get; set; } = default!;
    }
}
