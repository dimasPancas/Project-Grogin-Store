using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Wishlists.Command.DeleteWishlist
{
    public class DeleteWishlistCommandHandler : IRequestHandler<DeleteWishlistCommand, bool>
    {
        private readonly IWishlistRepository wishlistRepository;
        private readonly ILogger<DeleteWishlistCommandHandler> logger;

        public DeleteWishlistCommandHandler(IWishlistRepository wishlistRepository, ILogger<DeleteWishlistCommandHandler> logger)
        {
            this.wishlistRepository = wishlistRepository;
            this.logger = logger;
        }

        public async Task<bool> Handle(DeleteWishlistCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Remove wishlist from items with id: {request.Id}");
            bool result = await wishlistRepository.DeleteWishlist(request.Id);
            if (result) return true;
            throw new NotFoundException(nameof(Wishlist), request.Id.ToString());
        }
    }
}
