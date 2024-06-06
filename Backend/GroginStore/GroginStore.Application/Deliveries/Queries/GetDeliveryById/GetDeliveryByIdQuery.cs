using GroginStore.Application.Deliveries.DTOs;
using MediatR;

namespace GroginStore.Application.Deliveries.Queries.GetDeliveryById
{
    public class GetDeliveryByIdQuery : IRequest<DeliveryByIdDto>
    {
        public GetDeliveryByIdQuery(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }
}
