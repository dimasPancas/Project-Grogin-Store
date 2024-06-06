using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Commands.RestoreCategory
{
    public class RestoreCategoryCommandHandler : IRequestHandler<RestoreCategoryCommand>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly ILogger<RestoreCategoryCommandHandler> logger;
        private readonly IUserContext userContext;

        public RestoreCategoryCommandHandler(ICategoryRepository categoryRepository, ILogger<RestoreCategoryCommandHandler> logger, IUserContext userContext)
        {
            this.categoryRepository = categoryRepository;
            this.logger = logger;
            this.userContext = userContext;
        }


        public async Task Handle(RestoreCategoryCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Restore Category with id: {request.CategoryId}");
            var user = userContext.GetCurrentUser();
            var deletedCategory = await categoryRepository.GetCategoryById(request.CategoryId);
            if (deletedCategory == null) throw new NotFoundException(nameof(Category), request.CategoryId!);

            deletedCategory.IsActive = true;
            deletedCategory.UpdatedDate = DateTime.Now;
            deletedCategory.UpdatedBy = user?.Id;

            await categoryRepository.SaveChanges();
        }
    }
}
