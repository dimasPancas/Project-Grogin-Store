using MediatR;

namespace GroginStore.Application.Products.Commands.DeleteProduct;

public class DeleteProductCommand : IRequest
{
    public DeleteProductCommand(string id)
    {
        Id = id;
    }
    public string Id { get; }
}
