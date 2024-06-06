using MediatR;

namespace GroginStore.Application.Payments.Commands.DeletePayment
{
    public class DeletePaymentCommand : IRequest
    {
        public DeletePaymentCommand(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
    }
}
