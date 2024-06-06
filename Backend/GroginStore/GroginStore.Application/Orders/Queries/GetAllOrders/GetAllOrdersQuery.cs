using GroginStore.Application.Orders.DTOs;
using MediatR;

namespace GroginStore.Application.Orders.Queries.GetAllOrders;

public class GetAllOrdersQuery : IRequest<IEnumerable<OrderListAdminDto>>
{
    public int? OrderStatus { get; set; }
}
