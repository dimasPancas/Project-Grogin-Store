using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Command.DeleteVoucher;

public class DeleteVoucherCommandHandler : IRequestHandler<DeleteVoucherCommand>
{
    private readonly IVoucherRepository voucherRepository;
    private readonly ILogger<DeleteVoucherCommandHandler> logger;

    public DeleteVoucherCommandHandler(IVoucherRepository voucherRepository, ILogger<DeleteVoucherCommandHandler> logger)
    {
        this.voucherRepository = voucherRepository;
        this.logger = logger;
    }

    public async Task Handle(DeleteVoucherCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"deleted voucher with id: {request.VoucherId}");
        var voucherExist = await voucherRepository.GetVoucherById(request.VoucherId);
        if(voucherExist == null) throw new NotFoundException(nameof(Voucher), request.VoucherId);
        voucherExist.IsActive = false;
        await voucherRepository.SaveChanges();
    }
}
