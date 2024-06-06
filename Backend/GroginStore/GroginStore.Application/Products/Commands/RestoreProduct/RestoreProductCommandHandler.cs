using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Commands.RestoreProduct
{
    public class RestoreProductCommandHandler : IRequestHandler<RestoreProductCommand>
    {
        private readonly ILogger<RestoreProductCommandHandler> logger;
        private readonly IProductsRepository productsRepository;
        private readonly IUserContext userContext;

        public RestoreProductCommandHandler(ILogger<RestoreProductCommandHandler> logger, IProductsRepository productsRepository,
            IUserContext userContext)
        {
            this.logger = logger;
            this.productsRepository = productsRepository;
            this.userContext = userContext;
        }


        public async Task Handle(RestoreProductCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Restore product with productId: {request.ProductId}");
            var user = userContext.GetCurrentUser();

            var product = await productsRepository.GetDetailProduct(request.ProductId);
            if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);

            product.IsActive = true;
            product.UpdatedDate = DateTime.Now;
            product.UpdatedBy = user!.Id;

            await productsRepository.SaveChanges();
        }
    }
}
