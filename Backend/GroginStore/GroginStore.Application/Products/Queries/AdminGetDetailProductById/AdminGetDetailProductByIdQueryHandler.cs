using AutoMapper;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Queries.AdminGetDetailProductById;

public class AdminGetDetailProductByIdQueryHandler : IRequestHandler<AdminGetDetailProductByIdQuery, ProductDetailAdminDto>
{
    private readonly IMapper mapper;
    private readonly IProductsRepository productsRepository;
    private readonly ILogger<AdminGetDetailProductByIdQueryHandler> logger;

    public AdminGetDetailProductByIdQueryHandler(IMapper mapper, IProductsRepository productsRepository, ILogger<AdminGetDetailProductByIdQueryHandler> logger)
    {
        this.mapper = mapper;
        this.productsRepository = productsRepository;
        this.logger = logger;
    }

    public async Task<ProductDetailAdminDto> Handle(AdminGetDetailProductByIdQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Admin Getting Detail product with id: {request.ProductId}");

        var product = await productsRepository.AdminGetProductById(request.ProductId);
        if(product == null) throw new NotFoundException(nameof(Product), request.ProductId);

        var result = mapper.Map<ProductDetailAdminDto>(product);
        //var productDetail = mapper.Map<ProductDetailDto>(product);
        return result;
    }
}
