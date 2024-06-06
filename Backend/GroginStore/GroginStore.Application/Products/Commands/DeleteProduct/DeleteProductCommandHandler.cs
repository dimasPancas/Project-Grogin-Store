using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
    {
        private readonly ILogger<DeleteProductCommandHandler> logger;
        private readonly IProductsRepository productsRepository;

        public DeleteProductCommandHandler(ILogger<DeleteProductCommandHandler> logger, IProductsRepository productsRepository)
        {
            this.logger = logger;
            this.productsRepository = productsRepository;
        }

        public async Task Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Deleting product with Id: {request.Id}");
            var productExist = await productsRepository.GetDetailProduct(request.Id);
            if (productExist == null) throw new NotFoundException(nameof(Product), request.Id);
            productExist.IsActive = false;
            productExist.DeletedDate = DateTime.Now;
            await productsRepository.SaveChanges();
        }
    }
}
