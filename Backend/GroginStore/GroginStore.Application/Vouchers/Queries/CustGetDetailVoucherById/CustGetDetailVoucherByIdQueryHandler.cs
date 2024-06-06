using AutoMapper;
using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Queries.CustGetDetailVoucherById;

public class CustGetDetailVoucherByIdQueryHandler : IRequestHandler<CustGetDetailVoucherByIdQuery, VoucherDetailByIdCustDto>
{
    private readonly IMapper mapper;
    private readonly ILogger<CustGetDetailVoucherByIdQueryHandler> logger;
    private readonly IVoucherRepository voucherRepository;

    public CustGetDetailVoucherByIdQueryHandler(IMapper mapper, ILogger<CustGetDetailVoucherByIdQueryHandler> logger, IVoucherRepository voucherRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.voucherRepository = voucherRepository;
    }


    public async Task<VoucherDetailByIdCustDto> Handle(CustGetDetailVoucherByIdQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"customer get detail voucher with Id: {request.VoucherId}");
        var voucher = await voucherRepository.GetVoucherById(request.VoucherId);
        if(voucher == null) throw new NotFoundException(nameof(Voucher), request.VoucherId!);

        var result = mapper.Map<VoucherDetailByIdCustDto>(voucher);
        return result;
    }
}
