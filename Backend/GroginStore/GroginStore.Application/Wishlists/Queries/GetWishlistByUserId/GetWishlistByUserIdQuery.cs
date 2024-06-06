using GroginStore.Application.Wishlists.DTOs;
using MediatR;

namespace GroginStore.Application.Wishlists.Queries.GetWishlistByUserId
{
    public class GetWishlistByUserIdQuery : IRequest<IEnumerable<WishlistDto>>
    {
        
    }
}
