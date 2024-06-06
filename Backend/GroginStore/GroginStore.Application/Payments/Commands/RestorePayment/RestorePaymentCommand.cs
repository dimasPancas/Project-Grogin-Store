using MediatR;

namespace GroginStore.Application.Payments.Commands.RestorePayment;

public class RestorePaymentCommand : IRequest
{
    public RestorePaymentCommand(string paymentId)
    {
        PaymentId = paymentId;
    }

    public string PaymentId { get; }
}
