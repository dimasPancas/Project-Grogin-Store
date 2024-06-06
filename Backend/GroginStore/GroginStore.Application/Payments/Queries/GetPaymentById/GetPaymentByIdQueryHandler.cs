using AutoMapper;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Queries.GetPaymentById
{
    public class GetPaymentByIdQueryHandler : IRequestHandler<GetPaymentByIdQuery, PaymentByIdDto>
    {
        private readonly IMapper mapper;
        private readonly IPaymentsRepository paymentsRepository;
        private readonly ILogger<GetPaymentByIdQueryHandler> logger;

        public GetPaymentByIdQueryHandler(IMapper mapper, IPaymentsRepository paymentsRepository, ILogger<GetPaymentByIdQueryHandler> logger)
        {
            this.mapper = mapper;
            this.paymentsRepository = paymentsRepository;
            this.logger = logger;
        }


        public async Task<PaymentByIdDto> Handle(GetPaymentByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Getting payment detail with Id: {request.Id}");
            var payment = await paymentsRepository.GetPaymentById(request.Id);
            if (payment == null) throw new NotFoundException(nameof(Payment), request.Id);
            var paymentDetail = mapper.Map<PaymentByIdDto>(payment);
            return paymentDetail;
        }
    }
}
