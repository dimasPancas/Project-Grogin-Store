using MediatR;

namespace GroginStore.Application.Carts.Command.DeleteCart;

public class DeleteCartCommand : IRequest
{
    public DeleteCartCommand(string id)
    {
        Id = id;
    }

    public string Id { get; }
}
