using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Queries.GetCategoryById
{
    public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryByIdDto>
    {
        private readonly ILogger<GetCategoryByIdQueryHandler> logger;
        private readonly IMapper mapper;
        private readonly ICategoryRepository categoryRepository;

        public GetCategoryByIdQueryHandler(ILogger<GetCategoryByIdQueryHandler> logger, IMapper mapper, ICategoryRepository categoryRepository)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
        }

        public async Task<CategoryByIdDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Getting Category with Id: {request.Id}");
            var category = await categoryRepository.GetCategoryById(request.Id) ?? throw new NotFoundException(nameof(Category), request.Id!);
            var categoryDetail = mapper.Map<CategoryByIdDto>(category);
            return categoryDetail;
        }
    }
}
