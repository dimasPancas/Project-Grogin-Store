using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Commands.DeletePayment
{
    public class DeletePaymentCommandHandler : IRequestHandler<DeletePaymentCommand>
    {
        private readonly ILogger<DeletePaymentCommandHandler> logger;
        private readonly IPaymentsRepository paymentsRepository;
        private readonly IMapper mapper;

        public DeletePaymentCommandHandler(ILogger<DeletePaymentCommandHandler> logger, IPaymentsRepository paymentsRepository, IMapper mapper)
        {
            this.logger = logger;
            this.paymentsRepository = paymentsRepository;
            this.mapper = mapper;
        }


        public async Task Handle(DeletePaymentCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Deleting payment with Id: {request.Id}");
            var payment = await paymentsRepository.GetPaymentById(request.Id );
            if( payment == null ) throw new NotFoundException(nameof(Payment), request.Id.ToString());
            payment.IsActive = false;
            payment.DeletedDate = DateTime.Now;
            await paymentsRepository.SaveChanges();
        }
    }
}
