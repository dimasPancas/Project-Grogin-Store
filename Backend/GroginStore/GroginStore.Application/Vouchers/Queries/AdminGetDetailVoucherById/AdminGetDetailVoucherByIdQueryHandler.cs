
using AutoMapper;
using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Queries.AdminGetDetailVoucherById;

public class AdminGetDetailVoucherByIdQueryHandler : IRequestHandler<AdminGetDetailVoucherByIdQuery, VoucherDetailByIdAdminDto>
{
    private readonly IVoucherRepository voucherRepository;
    private readonly IMapper mapper;
    private readonly ILogger<AdminGetDetailVoucherByIdQueryHandler> logger;

    public AdminGetDetailVoucherByIdQueryHandler(IVoucherRepository voucherRepository, IMapper mapper, ILogger<AdminGetDetailVoucherByIdQueryHandler> logger)
    {
        this.voucherRepository = voucherRepository;
        this.mapper = mapper;
        this.logger = logger;
    }



    public async Task<VoucherDetailByIdAdminDto> Handle(AdminGetDetailVoucherByIdQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"admin get detail voucher with id: {request.VoucherId}");
        var voucher = await voucherRepository.GetVoucherById(request.VoucherId);
        if(voucher == null ) throw new NotFoundException(nameof(Voucher), request.VoucherId!);
        var result = mapper.Map<VoucherDetailByIdAdminDto>(voucher );
        return result;
    }
}
