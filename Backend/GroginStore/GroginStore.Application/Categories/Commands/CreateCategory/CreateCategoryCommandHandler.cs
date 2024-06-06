using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly IMapper mapper;
    private readonly ILogger<CreateCategoryCommandHandler> logger;
    private readonly ICategoryRepository categoryRepository;
    private readonly IUserContext userContext;

    public CreateCategoryCommandHandler(IMapper mapper, ILogger<CreateCategoryCommandHandler> logger,
        ICategoryRepository categoryRepository, IUserContext userContext)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.categoryRepository = categoryRepository;
        this.userContext = userContext;
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Creating New Category");
        var user = userContext.GetCurrentUser();
        var categoryModel = mapper.Map<Category>(request);
        categoryModel.CreatedBy = user?.Id;
        categoryModel.CreatedDate = DateTime.Now;
        var category = await categoryRepository.CreateCategory(categoryModel);
        var result = mapper.Map<CategoryDto>(category);
        return result;
    }
}