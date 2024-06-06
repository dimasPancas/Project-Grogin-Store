using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Queries.AdminGetAllProduct;

public class AdminGetAllProductQueryHandler : IRequestHandler<AdminGetAllProductQuery, PagedResult<ProductListAdminDto>>
{
    private readonly ILogger<AdminGetAllProductQueryHandler> logger;
    private readonly IProductsRepository productsRepository;
    private readonly IMapper mapper;

    public AdminGetAllProductQueryHandler(ILogger<AdminGetAllProductQueryHandler> logger, IProductsRepository productsRepository, IMapper mapper)
    {
        this.logger = logger;
        this.productsRepository = productsRepository;
        this.mapper = mapper;
    }


    public async Task<PagedResult<ProductListAdminDto>> Handle(AdminGetAllProductQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting all products for admin");
        var (products, totalCount) = await productsRepository.AdminGetAllMatchingProducts(
            request.search, request.PageSize, request.PageNumber, request.IsActive, request.CategoryId, request.SortBy, request.SortDirection);

        var productsDto = mapper.Map<IEnumerable<ProductListAdminDto>>(products);
        var result = new PagedResult<ProductListAdminDto>(productsDto, totalCount, request.PageSize, request.PageNumber);
        return result;
    }
}
