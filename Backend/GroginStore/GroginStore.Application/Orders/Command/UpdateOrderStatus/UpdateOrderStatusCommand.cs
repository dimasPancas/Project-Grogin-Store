using MediatR;

namespace GroginStore.Application.Orders.Command.UpdateOrderStatus;

public class UpdateOrderStatusCommand : IRequest
{
    public string? orderId { get; set; }
    public int OrderStatus { get; set; }
}
