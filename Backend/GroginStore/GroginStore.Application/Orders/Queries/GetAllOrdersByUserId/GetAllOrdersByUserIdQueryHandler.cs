using AutoMapper;
using GroginStore.Application.Orders.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Queries.GetAllOrdersByUserId
{
    public class GetAllOrdersByUserIdQueryHandler : IRequestHandler<GetAllOrdersByUserIdQuery, IEnumerable<OrderListDto>>
    {
        private readonly IOrderRepository orderRepository;
        private readonly IUserContext userContext;
        private readonly IMapper mapper;
        private readonly ILogger<GetAllOrdersByUserIdQueryHandler> logger;

        public GetAllOrdersByUserIdQueryHandler(IOrderRepository orderRepository, IUserContext userContext,
            IMapper mapper, ILogger<GetAllOrdersByUserIdQueryHandler> logger
            )
        {
            this.orderRepository = orderRepository;
            this.userContext = userContext;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<OrderListDto>> Handle(GetAllOrdersByUserIdQuery request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();
            logger.LogInformation($"Getting all order ny UserId: {user!.Id}");
            var orders = await orderRepository.GetAllOrdersByUserId(user.Id, request.OrderStatus);
            var result = mapper.Map<IEnumerable<OrderListDto>>(orders);
            return result;
        }
    }
}
