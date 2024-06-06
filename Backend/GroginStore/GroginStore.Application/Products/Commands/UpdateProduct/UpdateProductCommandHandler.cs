using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Products.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductDetailDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<UpdateProductCommandHandler> logger;
        private readonly IProductsRepository productsRepository;
        private readonly IUserContext userContext;
        private readonly IFileService fileService;

        public UpdateProductCommandHandler(IMapper mapper, ILogger<UpdateProductCommandHandler> logger, IProductsRepository productsRepository,
            IUserContext userContext, IFileService fileService)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.productsRepository = productsRepository;
            this.userContext = userContext;
            this.fileService = fileService;
        }


        public async Task<ProductDetailDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Updating product with Id: {request.Id}");
            var user = userContext.GetCurrentUser();
            string[] allowedFileExtension = [".jpg", ".jpeg", ".png"];

            var productExist = await productsRepository.GetDetailProduct(request.Id!);
            if (productExist == null) throw new NotFoundException(nameof(Product), request.Id!.ToString());

            string? imgPath = null;
            if(request.ImageFile != null)
            {
                if(productExist.ProductImage != null) fileService.DeleteFile(productExist.ProductImage);
                imgPath = await fileService.SaveFileAsync(request.ImageFile, allowedFileExtension);
            }


            mapper.Map(request, productExist);
            productExist.UpdatedDate = DateTime.Now;
            productExist.UpdatedBy = user?.Id;
            if(imgPath != null) productExist.ProductImage = imgPath;

            await productsRepository.SaveChanges();
            var productDetail = mapper.Map<ProductDetailDto>(productExist);
            return productDetail;
        }
    }
}
