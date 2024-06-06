using GroginStore.Application.Payments.DTOs;
using MediatR;
namespace GroginStore.Application.Payments.Queries.GetPaymentById
{
    public class GetPaymentByIdQuery : IRequest<PaymentByIdDto>
    {
        public GetPaymentByIdQuery(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
    }
}
