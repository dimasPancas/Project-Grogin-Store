using MediatR;

namespace GroginStore.Application.Products.Commands.RestoreProduct
{
    public class RestoreProductCommand : IRequest
    {
        public RestoreProductCommand(string productId)
        {
            ProductId = productId;
        }

        public string ProductId { get; }
    }
}
