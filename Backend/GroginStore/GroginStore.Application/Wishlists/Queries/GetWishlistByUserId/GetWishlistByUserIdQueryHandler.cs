using AutoMapper;
using GroginStore.Application.Users;
using GroginStore.Application.Wishlists.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Wishlists.Queries.GetWishlistByUserId
{
    public class GetWishlistByUserIdQueryHandler : IRequestHandler<GetWishlistByUserIdQuery, IEnumerable<WishlistDto>>
    {
        private readonly IWishlistRepository wishlistRepository;
        private readonly IUserContext userContext;
        private readonly IMapper mapper;
        private readonly ILogger<GetWishlistByUserIdQueryHandler> logger;

        public GetWishlistByUserIdQueryHandler(IWishlistRepository wishlistRepository,IUserContext userContext, IMapper mapper, ILogger<GetWishlistByUserIdQueryHandler> logger)
        {
            this.wishlistRepository = wishlistRepository;
            this.userContext = userContext;
            this.mapper = mapper;
            this.logger = logger;
        }


        public async Task<IEnumerable<WishlistDto>> Handle(GetWishlistByUserIdQuery request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();
            logger.LogInformation($"Getting all wishlistItems with userId : {user?.Id}");
            var wishlistItems = await wishlistRepository.GetAllWishlistByUserId(user!.Id);
            var result = mapper.Map<IEnumerable<WishlistDto>>(wishlistItems);
            return result;
        }
    }
}
