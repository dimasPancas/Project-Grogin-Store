using GroginStore.Application.Deliveries.DTOs;
using MediatR;

namespace GroginStore.Application.Deliveries.Command.UpdateDelivery
{
    public class UpdateDeliveryCommand : IRequest<DelieryDto>
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
    }
}
