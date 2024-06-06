using AutoMapper;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Wishlists.Command.AddWishlist
{
    public class AddWishlistCommandHandler : IRequestHandler<AddWishlistCommand>
    {
        private readonly IProductsRepository productsRepository;
        private readonly IUserContext userContext;
        private readonly ILogger<AddWishlistCommandHandler> logger;
        private readonly IMapper mapper;
        private readonly IWishlistRepository wishlistRepository;

        public AddWishlistCommandHandler(IProductsRepository productsRepository, IUserContext userContext, ILogger<AddWishlistCommandHandler> logger, IMapper mapper, IWishlistRepository wishlistRepository)
        {
            this.productsRepository = productsRepository;
            this.userContext = userContext;
            this.logger = logger;
            this.mapper = mapper;
            this.wishlistRepository = wishlistRepository;
        }
        public async Task Handle(AddWishlistCommand request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();
            logger.LogInformation($"add to wishlist for userId : {user?.Id}");

            var product = await productsRepository.GetDetailProduct(request.ProductId!);
            if (product?.Stock == 0 || product == null) throw new NotFoundException(nameof(Product), request.ProductId!);

            var wishlistModel = mapper.Map<Wishlist>(request);
            wishlistModel.UserId = user?.Id;
            wishlistModel.AddedDate = DateTime.Now;
            await wishlistRepository.AddWishlist(wishlistModel);
        }
    }
}


