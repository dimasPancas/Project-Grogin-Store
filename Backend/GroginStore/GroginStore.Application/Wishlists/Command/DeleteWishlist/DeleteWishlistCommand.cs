using MediatR;

namespace GroginStore.Application.Wishlists.Command.DeleteWishlist;

public class DeleteWishlistCommand : IRequest<bool>
{
    public DeleteWishlistCommand(string id)
    {
        Id = id;
    }

    public string Id { get; }
}
