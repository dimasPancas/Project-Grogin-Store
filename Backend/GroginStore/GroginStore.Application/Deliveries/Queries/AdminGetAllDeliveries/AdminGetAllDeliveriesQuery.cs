using GroginStore.Application.Deliveries.DTOs;
using MediatR;

namespace GroginStore.Application.Deliveries.Queries.AdminGetAllDeliveries;

public class AdminGetAllDeliveriesQuery : IRequest<IEnumerable<AdminDeliveryDto>>
{
    public bool? IsActive { get; set; }
}
