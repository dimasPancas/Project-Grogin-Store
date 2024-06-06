using AutoMapper;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Commands.UpdatePayment
{
    public class UpdatePaymentCommandHandler : IRequestHandler<UpdatePaymentCommand, PaymentDto>
    {
        private readonly IPaymentsRepository paymentsRepository;
        private readonly IMapper mapper;
        private readonly ILogger<UpdatePaymentCommandHandler> logger;
        private readonly IUserContext userContext;

        public UpdatePaymentCommandHandler(IPaymentsRepository paymentsRepository, IMapper mapper, ILogger<UpdatePaymentCommandHandler> logger,
            IUserContext userContext)
        {
            this.paymentsRepository = paymentsRepository;
            this.mapper = mapper;
            this.logger = logger;
            this.userContext = userContext;
        }

        public async Task<PaymentDto> Handle(UpdatePaymentCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Updating payment with id: {request.Id}");
            var user = userContext.GetCurrentUser();

            var payment = await paymentsRepository.GetPaymentById(request.Id!);
            if (payment == null) throw new NotFoundException(nameof(Payment), request.Id!);
            mapper.Map(request, payment);
            payment.UpdatedDate = DateTime.Now;
            payment.UpdatedBy = user?.Id;
            await paymentsRepository.SaveChanges();
            var paymentDto = mapper.Map<PaymentDto>(payment);
            return paymentDto;
        }
    }
}
