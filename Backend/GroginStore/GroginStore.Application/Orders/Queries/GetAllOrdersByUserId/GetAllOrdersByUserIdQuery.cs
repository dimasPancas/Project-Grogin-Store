using GroginStore.Application.Orders.DTOs;
using MediatR;

namespace GroginStore.Application.Orders.Queries.GetAllOrdersByUserId;

public class GetAllOrdersByUserIdQuery : IRequest<IEnumerable<OrderListDto>>
{
    public int? OrderStatus { get; set; }
}
