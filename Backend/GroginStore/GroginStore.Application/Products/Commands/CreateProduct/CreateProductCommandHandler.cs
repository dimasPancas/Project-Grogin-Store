using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Products.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
    {
        private readonly IMapper mapper;
        private readonly IProductsRepository productsRepository;
        private readonly ILogger<CreateProductCommandHandler> logger;
        private readonly IUserContext userContext;
        private readonly IFileService fileService;

        public CreateProductCommandHandler(IMapper mapper, IProductsRepository productsRepository, ILogger<CreateProductCommandHandler> logger, 
            IUserContext userContext, IFileService fileService)
        {
            this.mapper = mapper;
            this.productsRepository = productsRepository;
            this.logger = logger;
            this.userContext = userContext;
            this.fileService = fileService;
        }

        public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Creating New Product");
            var user = userContext.GetCurrentUser();
            string[] allowedFileExtension = [".jpg", ".jpeg", ".png"];

            string? imgPath = null;
            if(request.ImageFile != null) imgPath = await fileService.SaveFileAsync(request.ImageFile, allowedFileExtension);

            var productModel = mapper.Map<Product>(request);
            productModel.ProductImage = imgPath;
            productModel.CreatedBy = user?.Id;
            productModel.CreatedDate = DateTime.Now;

            var product = await productsRepository.CreateProduct(productModel);
            var result = mapper.Map<ProductDto>(product);
            return result;
        }
    }
}
