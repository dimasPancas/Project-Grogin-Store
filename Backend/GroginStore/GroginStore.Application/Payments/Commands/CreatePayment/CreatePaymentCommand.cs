using GroginStore.Application.Payments.DTOs;
using MediatR;

namespace GroginStore.Application.Payments.Commands.CreatePayment
{
    public class CreatePaymentCommand : IRequest<PaymentDto>
    {
        public string Name { get; set; } = default!;
        public decimal PaymentCost { get; set; }
    }

}
