using MediatR;

namespace GroginStore.Application.Orders.Command.CreateOrderFromCartUser;

public class CreateOrderFromCartUserCommand : IRequest
{
    public string PaymentId { get; set; } = default!;
    public string AddresId { get; set; } = default!;
    public string DeliveryId { get; set; } = default!;
    public string? VoucherFreeShippingId { get; set; }
    public string? VoucherDiscountId { get; set; }
}
