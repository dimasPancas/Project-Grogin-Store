using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Command.UpdateVoucher;

public class UpdateVoucherCommandHandler : IRequestHandler<UpdateVoucherCommand>
{
    private readonly IMapper mapper;
    private readonly ILogger<UpdateVoucherCommandHandler> logger;
    private readonly IVoucherRepository voucherRepository;

    public UpdateVoucherCommandHandler(IMapper mapper, ILogger<UpdateVoucherCommandHandler> logger, IVoucherRepository voucherRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.voucherRepository = voucherRepository;
    }


    public async Task Handle(UpdateVoucherCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"updating voucher with id: {request.VoucherId}");
        var voucherExist = await voucherRepository.GetVoucherById(request.VoucherId!);
        if (voucherExist == null) throw new NotFoundException(nameof(Voucher), request.VoucherId!);

        mapper.Map(request, voucherExist);
        await voucherRepository.SaveChanges();
    }
}
