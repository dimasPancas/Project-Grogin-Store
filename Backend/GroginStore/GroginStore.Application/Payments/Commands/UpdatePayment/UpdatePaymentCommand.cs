using GroginStore.Application.Payments.DTOs;
using MediatR;

namespace GroginStore.Application.Payments.Commands.UpdatePayment
{
    public class UpdatePaymentCommand : IRequest<PaymentDto>
    {
        public string? Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal PaymentCost { get; set; }
    }
}
