using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Deliveries.Command.DeleteDelivery
{
    public class DeleteDeliveryCommandHandler : IRequestHandler<DeleteDeliveryCommand>
    {
        private readonly ILogger<DeleteDeliveryCommandHandler> logger;
        private readonly IDeliveriesRepository deliveriesRepository;

        public DeleteDeliveryCommandHandler(ILogger<DeleteDeliveryCommandHandler> logger, IDeliveriesRepository deliveriesRepository)
        {
            this.logger = logger;
            this.deliveriesRepository = deliveriesRepository;

        }

        public async Task Handle(DeleteDeliveryCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Deleting delivery with Id: {request.Id}");
            var delivery = await deliveriesRepository.GetDeliveryById(request.Id);
            if(delivery == null) throw new NotFoundException(nameof(Delivery), request.Id.ToString());
            delivery.IsActive = false;
            delivery.DeletedDate = DateTime.Now;
            await deliveriesRepository.SaveChanges();
        }
    }
}
