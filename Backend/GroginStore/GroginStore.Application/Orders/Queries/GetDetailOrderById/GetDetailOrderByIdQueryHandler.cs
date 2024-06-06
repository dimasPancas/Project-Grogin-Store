using AutoMapper;
using GroginStore.Application.Orders.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Queries.GetDetailOrderById;

public class GetDetailOrderByIdQueryHandler : IRequestHandler<GetDetailOrderByIdQuery, List<OrderDetailDto>>
{
    private readonly IMapper mapper;
    private readonly ILogger<GetDetailOrderByIdQueryHandler> logger;
    private readonly IOrderRepository orderRepository;

    public GetDetailOrderByIdQueryHandler(IMapper mapper, ILogger<GetDetailOrderByIdQueryHandler> logger, IOrderRepository orderRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.orderRepository = orderRepository;
    }

    public async Task<List<OrderDetailDto>> Handle(GetDetailOrderByIdQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Get Detail Order with id: {request.Id}");
        var orderDetails = await orderRepository.GetDetailOrderById(request.Id) ?? throw new NotFoundException(nameof(Order), request.Id.ToString());

        var result = mapper.Map<List<OrderDetailDto>>(orderDetails);
        return result;
    }
}
