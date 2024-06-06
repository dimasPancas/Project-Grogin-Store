using AutoMapper;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Queries.GetDeliveryById
{
    public class GetDeliveryByIdQueryHandler : IRequestHandler<GetDeliveryByIdQuery, DeliveryByIdDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<GetDeliveryByIdQueryHandler> logger;
        private readonly IDeliveriesRepository deliveriesRepository;

        public GetDeliveryByIdQueryHandler(IMapper mapper, ILogger<GetDeliveryByIdQueryHandler> logger, IDeliveriesRepository deliveriesRepository)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.deliveriesRepository = deliveriesRepository;
        }

        public async Task<DeliveryByIdDto> Handle(GetDeliveryByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Getting Delivery by Id: {request.Id}");
            var delivery = await deliveriesRepository.GetDeliveryById(request.Id);
            if (delivery == null) throw new NotFoundException(nameof(Delivery), request.Id.ToString());
            var result = mapper.Map<DeliveryByIdDto>(delivery);
            return result;
        }
    }
}
