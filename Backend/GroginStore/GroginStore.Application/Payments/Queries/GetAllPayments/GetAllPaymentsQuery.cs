using GroginStore.Application.Payments.DTOs;
using MediatR;

namespace GroginStore.Application.Payments.Queries.GetAllPayments
{
    public class GetAllPaymentsQuery : IRequest<IEnumerable<PaymentDto>>
    {

    }
}
