using AutoMapper;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;
        private readonly ILogger<DeleteCategoryCommandHandler> logger;

        public DeleteCategoryCommandHandler(ICategoryRepository categoryRepository, IMapper mapper,
            ILogger<DeleteCategoryCommandHandler> logger)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Deleting category with Id: {request.Id}");

            var category = await categoryRepository.GetCategoryById(request.Id);
            if (category == null) throw new NotFoundException(nameof(Category), request.Id);
            category.IsActive = false;
            category.DeletedDate = DateTime.Now;
            await categoryRepository.SaveChanges();
        }
    }
}
