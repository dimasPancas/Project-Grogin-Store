using MediatR;

namespace GroginStore.Application.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest
    {
        public DeleteCategoryCommand(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
    }
}
