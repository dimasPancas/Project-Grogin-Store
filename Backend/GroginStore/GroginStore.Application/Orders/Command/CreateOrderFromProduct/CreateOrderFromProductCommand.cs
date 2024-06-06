using MediatR;

namespace GroginStore.Application.Orders.Command.CreateOrderFromProduct;

public class CreateOrderFromProductCommand : IRequest
{
    public string ProductId { get; set; } = default!;
    public int Quantity { get; set; }
    public string PaymentId { get; set; } = default!;
    public string AddresId { get; set; } = default!;
    public string DeliveryId { get; set; } = default!;
    public string? VoucherFreeShippingId { get; set; }
    public string? VoucherDiscountId { get; set; }
}
