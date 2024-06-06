using AutoMapper;
using GroginStore.Application.Orders.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Queries.GetAllOrders;

public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, IEnumerable<OrderListAdminDto>>
{
    private readonly ILogger<GetAllOrdersQueryHandler> logger;
    private readonly IOrderRepository orderRepository;
    private readonly IMapper mapper;

    public GetAllOrdersQueryHandler(ILogger<GetAllOrdersQueryHandler> logger, IOrderRepository orderRepository, IMapper mapper)
    {
        this.logger = logger;
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }


    public async Task<IEnumerable<OrderListAdminDto>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting all orders");
        var orders = await orderRepository.GetAllOrders(request.OrderStatus);
        var result = mapper.Map<IEnumerable<OrderListAdminDto>>(orders);
        return result;
    }
}
