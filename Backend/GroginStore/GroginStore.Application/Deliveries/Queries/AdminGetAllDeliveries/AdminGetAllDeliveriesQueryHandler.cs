using AutoMapper;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Queries.AdminGetAllDeliveries;

public class AdminGetAllDeliveriesQueryHandler : IRequestHandler<AdminGetAllDeliveriesQuery, IEnumerable<AdminDeliveryDto>>
{
    private readonly IMapper mapper;
    private readonly IDeliveriesRepository deliveriesRepository;
    private readonly ILogger<AdminGetAllDeliveriesQueryHandler> logger;

    public AdminGetAllDeliveriesQueryHandler(IMapper mapper, IDeliveriesRepository deliveriesRepository, ILogger<AdminGetAllDeliveriesQueryHandler> logger)
    {
        this.mapper = mapper;
        this.deliveriesRepository = deliveriesRepository;
        this.logger = logger;
    }

    public async Task<IEnumerable<AdminDeliveryDto>> Handle(AdminGetAllDeliveriesQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Admin getting all categories");
        var categories = await deliveriesRepository.AdminGetAllDeliveries(request.IsActive);
        var result = mapper.Map<IEnumerable<AdminDeliveryDto>>(categories);
        return result;
    }
}
