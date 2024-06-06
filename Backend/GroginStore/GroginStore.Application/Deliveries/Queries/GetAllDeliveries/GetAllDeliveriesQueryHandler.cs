using AutoMapper;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics.CodeAnalysis;

namespace GroginStore.Application.Deliveries.Queries.GetAllDeliveries
{
    public class GetAllDeliveriesQueryHandler : IRequestHandler<GetAllDeliveriesQuery, IEnumerable<DelieryDto>>
    {
        private readonly IMapper mapper;
        private readonly ILogger<GetAllDeliveriesQueryHandler> logger;
        private readonly IDeliveriesRepository deliveriesRepository;

        public GetAllDeliveriesQueryHandler(IMapper mapper, ILogger<GetAllDeliveriesQueryHandler> logger, IDeliveriesRepository deliveriesRepository)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.deliveriesRepository = deliveriesRepository;
        }

        public async Task<IEnumerable<DelieryDto>> Handle(GetAllDeliveriesQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Get all Deliveries");
            var deliveries = await deliveriesRepository.GetAllDeliveries();
            var result = mapper.Map<IEnumerable<DelieryDto>>(deliveries);
            return result;
        }
    }
}
