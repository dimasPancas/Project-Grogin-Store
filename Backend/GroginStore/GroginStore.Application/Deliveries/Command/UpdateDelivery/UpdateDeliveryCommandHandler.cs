using AutoMapper;
using GroginStore.Application.Deliveries.Command.CreateDelivery;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Command.UpdateDelivery
{
    public class UpdateDeliveryCommandHandler : IRequestHandler<UpdateDeliveryCommand, DelieryDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<UpdateDeliveryCommandHandler> logger;
        private readonly IDeliveriesRepository deliveriesRepository;
        private readonly IUserContext userContext;

        public UpdateDeliveryCommandHandler(IMapper mapper, ILogger<UpdateDeliveryCommandHandler> logger,
            IDeliveriesRepository deliveriesRepository, IUserContext userContext)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.deliveriesRepository = deliveriesRepository;
            this.userContext = userContext;
        }

        public async Task<DelieryDto> Handle(UpdateDeliveryCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Update delivery with Id: {request.Id}");
            var user = userContext.GetCurrentUser();

            var delivery = await deliveriesRepository.GetDeliveryById(request.Id.ToString());
            if (delivery == null) throw new NotFoundException(nameof(Delivery), request.Id.ToString());
            mapper.Map(request, delivery);
            delivery.UpdatedBy = user?.Id;
            delivery.UpdatedDate = DateTime.Now;

            await deliveriesRepository.SaveChanges();
            var deliveryDto = mapper.Map<DelieryDto>(delivery);
            return deliveryDto;
        }
    }
}
