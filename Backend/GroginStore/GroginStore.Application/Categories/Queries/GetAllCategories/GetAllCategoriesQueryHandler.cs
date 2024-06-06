using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
    {
        private readonly IMapper mapper;
        private readonly ILogger<GetAllCategoriesQueryHandler> logger;
        private readonly ICategoryRepository categoryRepository;

        public GetAllCategoriesQueryHandler(IMapper mapper, ILogger<GetAllCategoriesQueryHandler> logger, ICategoryRepository categoryRepository )
        {
            this.mapper = mapper;
            this.logger = logger;
            this.categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Getting all categories");
            var category = await categoryRepository.GetAllCategories();
            var result = mapper.Map<IEnumerable<CategoryDto>>(category);
            return result;
        }
    }
}
