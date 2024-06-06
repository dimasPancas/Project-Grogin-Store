using GroginStore.Application.Deliveries.DTOs;
using MediatR;

namespace GroginStore.Application.Deliveries.Command.CreateDelivery
{
    public class CreateDeliveryCommand : IRequest<DelieryDto>
    {
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
    }
}
