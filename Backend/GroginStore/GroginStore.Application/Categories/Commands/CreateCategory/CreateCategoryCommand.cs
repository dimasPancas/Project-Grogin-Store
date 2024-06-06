using GroginStore.Application.Categories.DTOs;
using MediatR;

namespace GroginStore.Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public string Name { get; set; } = default!;
}
