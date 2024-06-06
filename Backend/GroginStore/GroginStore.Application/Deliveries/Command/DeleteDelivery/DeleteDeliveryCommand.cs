using MediatR;

namespace GroginStore.Application.Deliveries.Command.DeleteDelivery
{
    public class DeleteDeliveryCommand : IRequest
    {
        public DeleteDeliveryCommand(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }
}
