using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<UpdateCategoryCommandHandler> logger;
        private readonly ICategoryRepository categoryRepository;
        private readonly IUserContext userContext;

        public UpdateCategoryCommandHandler(IMapper mapper, ILogger<UpdateCategoryCommandHandler> logger, 
            ICategoryRepository categoryRepository, IUserContext userContext )
        {
            this.mapper = mapper;
            this.logger = logger;
            this.categoryRepository = categoryRepository;
            this.userContext = userContext;
        }


        public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Updating category with Id: {request.Id}");
            var user = userContext.GetCurrentUser();
            
            var category = await categoryRepository.GetCategoryById(request.Id!);
            if (category == null) throw new NotFoundException(nameof(Category), request.Id!);
            mapper.Map(request, category);
            category.UpdatedDate = DateTime.Now;
            category.UpdatedBy = user?.Id;

            await categoryRepository.SaveChanges();
            var categoryDto = mapper.Map<CategoryDto>(category);
            return categoryDto;
        }
    }
}
