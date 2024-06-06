using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Command.CreateVoucher;

public class CreateVoucerCommandHandler : IRequestHandler<CreateVoucerCommand>
{
    private readonly IVoucherRepository voucherRepository;
    private readonly IMapper mapper;
    private readonly ILogger<CreateVoucerCommandHandler> logger;

    public CreateVoucerCommandHandler(IVoucherRepository voucherRepository, IMapper mapper, ILogger<CreateVoucerCommandHandler> logger)
    {
        this.voucherRepository = voucherRepository;
        this.mapper = mapper;
        this.logger = logger;
    }


    public async Task Handle(CreateVoucerCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Created new voucher");

        var voucherModel = mapper.Map<Voucher>(request);
        voucherModel.CreatedAt = DateTime.Now;
        await voucherRepository.CreateVoucher(voucherModel);
    }
}
