using AutoMapper;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Queries.GetAllPayments
{
    public class GetAllPaymentsQueryHandler : IRequestHandler<GetAllPaymentsQuery, IEnumerable<PaymentDto>>
    {
        private readonly IPaymentsRepository paymentsRepository;
        private readonly IMapper mapper;
        private readonly ILogger<GetAllPaymentsQueryHandler> logger;

        public GetAllPaymentsQueryHandler(IPaymentsRepository paymentsRepository, IMapper mapper, ILogger<GetAllPaymentsQueryHandler> logger)
        {
            this.paymentsRepository = paymentsRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<IEnumerable<PaymentDto>> Handle(GetAllPaymentsQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Getting all payments");
            var payments = await paymentsRepository.GetAllPayments();
            var result = mapper.Map<IEnumerable<PaymentDto>>(payments);
            return result;
        }
    }
}
