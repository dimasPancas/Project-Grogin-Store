using GroginStore.Application.Carts.DTOs;
using MediatR;

namespace GroginStore.Application.Carts.Queries.GetItemsCartByUserId
{
    public class GetItemsCartByUserIdQuery : IRequest<IEnumerable<CartListDto>>
    {

    }
}
