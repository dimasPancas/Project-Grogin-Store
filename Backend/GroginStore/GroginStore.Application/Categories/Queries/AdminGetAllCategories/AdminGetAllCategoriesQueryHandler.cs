using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Queries.AdminGetAllCategories;

public class AdminGetAllCategoriesQueryHandler : IRequestHandler<AdminGetAllCategoriesQuery, IEnumerable<AdminCategoryDto>>
{
    private readonly IMapper mapper;
    private readonly ILogger<AdminGetAllCategoriesQueryHandler> logger;
    private readonly ICategoryRepository categoryRepository;

    public AdminGetAllCategoriesQueryHandler(IMapper mapper, ILogger<AdminGetAllCategoriesQueryHandler> logger, ICategoryRepository categoryRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<AdminCategoryDto>> Handle(AdminGetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Admin getting all categories");
        var categories = await categoryRepository.AdminGetAllCategories(request.IsActive);
        var result = mapper.Map<IEnumerable<AdminCategoryDto>>(categories);
        return result;
    }
}
