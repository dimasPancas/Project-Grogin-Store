using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Command.RestoreDelivery;

public class RestoreDeliveryCommandHandler : IRequestHandler<RestoreDeliveryCommand>
{
    private readonly ILogger<RestoreDeliveryCommandHandler> logger;
    private readonly IUserContext userContext;
    private readonly IDeliveriesRepository deliveriesRepository;

    public RestoreDeliveryCommandHandler(ILogger<RestoreDeliveryCommandHandler> logger, IUserContext userContext, IDeliveriesRepository deliveriesRepository)
    {
        this.logger = logger;
        this.userContext = userContext;
        this.deliveriesRepository = deliveriesRepository;
    }


    public async Task Handle(RestoreDeliveryCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"restoring deleted delivery with id: {request.DeliveryId}");
        var user = userContext.GetCurrentUser();
        var deletedDelivery = await deliveriesRepository.GetDeliveryById(request.DeliveryId);
        if (deletedDelivery == null) throw new NotFoundException(nameof(Delivery), request.DeliveryId);

        deletedDelivery.IsActive = true;
        deletedDelivery.UpdatedDate = DateTime.Now;
        deletedDelivery.UpdatedBy = user?.Id;

        await deliveriesRepository.SaveChanges();
    }
}


