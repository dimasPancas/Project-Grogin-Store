using AutoMapper;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Queries.AdminGetAllPayments;

public class AdminGetAllPaymentsQueryHandler : IRequestHandler<AdminGetAllPaymentsQuery, IEnumerable<AdminPaymentDto>>
{
    private readonly IMapper mapper;
    private readonly ILogger<AdminGetAllPaymentsQueryHandler> logger;
    private readonly IPaymentsRepository paymentsRepository;

    public AdminGetAllPaymentsQueryHandler(IMapper mapper, ILogger<AdminGetAllPaymentsQueryHandler> logger, IPaymentsRepository paymentsRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.paymentsRepository = paymentsRepository;
    }


    public async Task<IEnumerable<AdminPaymentDto>> Handle(AdminGetAllPaymentsQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Admin getting all payments");
        var payments = await paymentsRepository.AdminGetAllPayments(request.IsActive);
        var result = mapper.Map<IEnumerable<AdminPaymentDto>>(payments);
        return result;
    }
}
