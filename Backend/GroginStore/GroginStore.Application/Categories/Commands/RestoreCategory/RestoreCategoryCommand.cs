using MediatR;
namespace GroginStore.Application.Categories.Commands.RestoreCategory;

public class RestoreCategoryCommand : IRequest
{
    public RestoreCategoryCommand(string categoryId)
    {
        CategoryId = categoryId;
    }

    public string CategoryId { get; }
}
