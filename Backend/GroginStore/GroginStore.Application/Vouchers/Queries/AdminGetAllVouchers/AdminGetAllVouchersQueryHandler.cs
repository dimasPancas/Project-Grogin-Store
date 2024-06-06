using AutoMapper;
using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.Constant;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Queries.AdminGetAllVouchers;

public class AdminGetAllVouchersQueryHandler : IRequestHandler<AdminGetAllVouchersQuery, IEnumerable<VoucherListAdminDto>>
{
    private readonly IVoucherRepository voucherRepository;
    private readonly IMapper mapper;
    private readonly ILogger<AdminGetAllVouchersQueryHandler> logger;

    public AdminGetAllVouchersQueryHandler(IVoucherRepository voucherRepository, IMapper mapper, ILogger<AdminGetAllVouchersQueryHandler> logger)
    {
        this.voucherRepository = voucherRepository;
        this.mapper = mapper;
        this.logger = logger;
    }


    public async Task<IEnumerable<VoucherListAdminDto>> Handle(AdminGetAllVouchersQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Admin get all vouchers");
        var vouchers = await voucherRepository.AdminGetAllVoucher(request.Type, request.IsActive);

        var result = mapper.Map<IEnumerable<VoucherListAdminDto>>(vouchers);
        return result;
    }
}
