using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Payments.Commands.RestorePayment;

public class RestorePaymentCommandHandler : IRequestHandler<RestorePaymentCommand>
{
    private readonly IUserContext userContext;
    private readonly IPaymentsRepository paymentsRepository;
    private readonly ILogger<RestorePaymentCommandHandler> logger;

    public RestorePaymentCommandHandler(IUserContext userContext, IPaymentsRepository paymentsRepository, ILogger<RestorePaymentCommandHandler> logger)
    {
        this.userContext = userContext;
        this.paymentsRepository = paymentsRepository;
        this.logger = logger;
    }
    public async Task Handle(RestorePaymentCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Restore deleted payment with id: {request.PaymentId}");
        var user = userContext.GetCurrentUser();

        var deletedPaymeny = await paymentsRepository.GetPaymentById(request.PaymentId);
        if (deletedPaymeny == null) throw new NotFoundException(nameof(Payment), request.PaymentId);

        deletedPaymeny.UpdatedDate = DateTime.Now;
        deletedPaymeny.IsActive = true;
        deletedPaymeny.UpdatedBy = user?.Id;

        await paymentsRepository.SaveChanges();
    }
}
