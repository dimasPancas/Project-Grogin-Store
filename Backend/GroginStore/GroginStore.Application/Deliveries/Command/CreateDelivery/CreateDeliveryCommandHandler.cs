using AutoMapper;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Command.CreateDelivery;

public class CreateDeliveryCommandHandler : IRequestHandler<CreateDeliveryCommand, DelieryDto>
{
    private readonly IDeliveriesRepository deliveriesRepository;
    private readonly IMapper mapper;
    private readonly ILogger<CreateDeliveryCommandHandler> logger;
    private readonly IUserContext userContext;

    public CreateDeliveryCommandHandler(IDeliveriesRepository deliveriesRepository, IMapper mapper, 
        ILogger<CreateDeliveryCommandHandler> logger, IUserContext userContext)
    {
        this.deliveriesRepository = deliveriesRepository;
        this.mapper = mapper;
        this.logger = logger;
        this.userContext = userContext;
    }


    public async Task<DelieryDto> Handle(CreateDeliveryCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Create new Delivery");
        var user = userContext.GetCurrentUser();

        var deliveryModel = mapper.Map<Delivery>(request);
        deliveryModel.CreatedDate = DateTime.Now;
        deliveryModel.CreatedBy = user?.Id;

        var delivery = await deliveriesRepository.CreateDelivery(deliveryModel);

        var deliveryDto = mapper.Map<DelieryDto>(delivery);
        return deliveryDto;
    }
}
