using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Queries.GetAllProducts;

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, PagedResult<ProductDto>>
{
    private readonly IProductsRepository productsRepository;
    private readonly ILogger<GetAllProductsQueryHandler> logger;
    private readonly IMapper mapper;

    public GetAllProductsQueryHandler(IProductsRepository productsRepository,ILogger<GetAllProductsQueryHandler> logger, IMapper mapper )
    {
        this.productsRepository = productsRepository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task<PagedResult<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting all products");
        var (products, totalCount) = await productsRepository.GetAllMatchingProducts(
            request.search, request.PageSize, request.PageNumber, request.SortBy, request.SortDirection, request.CategoryId);

        var productsDto = mapper.Map<IEnumerable<ProductDto>>(products);
        var result = new PagedResult<ProductDto>(productsDto, totalCount, request.PageSize, request.PageNumber);
        return result;
    }
}
