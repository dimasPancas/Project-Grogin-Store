using GroginStore.Application.Payments.DTOs;
using MediatR;

namespace GroginStore.Application.Payments.Queries.AdminGetAllPayments
{
    public class AdminGetAllPaymentsQuery : IRequest<IEnumerable<AdminPaymentDto>>
    {
        public bool? IsActive {  get; set; }
    }
}
