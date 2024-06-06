using AutoMapper;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDetailDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<GetProductByIdQueryHandler> logger;
        private readonly IProductsRepository productsRepository;

        public GetProductByIdQueryHandler(IMapper mapper, ILogger<GetProductByIdQueryHandler> logger, IProductsRepository productsRepository)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.productsRepository = productsRepository;
        }

        public async Task<ProductDetailDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Get Product Detail with Id : {productId}", request.Id);
            var product = await productsRepository.GetDetailProduct
                (request.Id) ?? throw new NotFoundException(nameof(Product), request.Id.ToString());
            var productDetail = mapper.Map<ProductDetailDto>(product);
            return productDetail;
        }

    }
}
