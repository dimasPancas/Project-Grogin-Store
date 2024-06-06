using MediatR;

namespace GroginStore.Application.Deliveries.Command.RestoreDelivery;

public class RestoreDeliveryCommand : IRequest
{
    public RestoreDeliveryCommand(string deliveryId)
    {
        DeliveryId = deliveryId;
    }

    public string DeliveryId { get; }
}
