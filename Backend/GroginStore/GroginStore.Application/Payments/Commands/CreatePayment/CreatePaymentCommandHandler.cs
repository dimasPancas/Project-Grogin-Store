using AutoMapper;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Commands.CreatePayment
{
    public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, PaymentDto>
    {
        private readonly IMapper mapper;
        private readonly IPaymentsRepository paymentsRepository;
        private readonly ILogger<CreatePaymentCommandHandler> logger;
        private readonly IUserContext userContext;

        public CreatePaymentCommandHandler(IMapper mapper, IPaymentsRepository paymentsRepository,
            ILogger<CreatePaymentCommandHandler> logger, IUserContext userContext)
        {
            this.mapper = mapper;
            this.paymentsRepository = paymentsRepository;
            this.logger = logger;
            this.userContext = userContext;
        }

        public async Task<PaymentDto> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Create new Payment");
            var user = userContext.GetCurrentUser();

            var paymentModel = mapper.Map<Payment>(request);
            paymentModel.CreatedDate = DateTime.Now;
            paymentModel.CreatedBy = user?.Id;

            var payment = await paymentsRepository.CreatePayment(paymentModel);
            var result = mapper.Map<PaymentDto>(payment);
            return result;
        }
    }
}
