using MediatR;

namespace GroginStore.Application.Orders.Command.UpdatePaymentVerificationCode;

public class UpdatePaymentVerificationCodeCommand : IRequest
{
    public string? OrderId { get; set; }
    public string PaymentCode { get; set; } = default!;
}
