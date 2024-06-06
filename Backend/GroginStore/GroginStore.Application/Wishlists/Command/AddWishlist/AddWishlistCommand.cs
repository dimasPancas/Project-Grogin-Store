using MediatR;

namespace GroginStore.Application.Wishlists.Command.AddWishlist;

public class AddWishlistCommand : IRequest
{
    public string? ProductId { get; set; }
}
