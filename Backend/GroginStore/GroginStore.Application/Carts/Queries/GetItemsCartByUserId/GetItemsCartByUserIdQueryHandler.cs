using AutoMapper;
using GroginStore.Application.Carts.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Carts.Queries.GetItemsCartByUserId
{
    public class GetItemsCartByUserIdQueryHandler : IRequestHandler<GetItemsCartByUserIdQuery, IEnumerable<CartListDto>>
    {
        private readonly ICartRepository cartRepository;
        private readonly ILogger<GetItemsCartByUserIdQueryHandler> logger;
        private readonly IUserContext userContext;
        private readonly IMapper mapper;

        public GetItemsCartByUserIdQueryHandler(ICartRepository cartRepository, ILogger<GetItemsCartByUserIdQueryHandler> logger, IUserContext userContext, IMapper mapper)
        {
            this.cartRepository = cartRepository;
            this.logger = logger;
            this.userContext = userContext;
            this.mapper = mapper;
        }


        public async Task<IEnumerable<CartListDto>> Handle(GetItemsCartByUserIdQuery request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();
            logger.LogInformation($"Getting all cart for userId: {user?.Id}");
            var cartItems = await cartRepository.GetCartItemsByUserId(user!.Id);
            var result = mapper.Map<IEnumerable<CartListDto>>(cartItems);
            return result;
        }
    }
}
