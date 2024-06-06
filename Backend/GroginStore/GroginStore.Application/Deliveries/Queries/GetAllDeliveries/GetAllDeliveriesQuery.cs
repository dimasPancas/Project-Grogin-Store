using GroginStore.Application.Deliveries.DTOs;
using MediatR;

namespace GroginStore.Application.Deliveries.Queries.GetAllDeliveries
{
    public class GetAllDeliveriesQuery : IRequest<IEnumerable<DelieryDto>>
    {
    }
}
