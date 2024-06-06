using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Users;
using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Queries.CustGetVouchersAvailable;

public class CustGetVouchersAvailableQueryHandler : IRequestHandler<CustGetVouchersAvailableQuery, VoucherResult<VouhcerListCustDto>>
{
    private readonly IMapper mapper;
    private readonly ILogger<CustGetVouchersAvailableQueryHandler> logger;
    private readonly IUserContext userContext;
    private readonly IVoucherRepository voucherRepository;

    public CustGetVouchersAvailableQueryHandler(IMapper mapper, ILogger<CustGetVouchersAvailableQueryHandler> logger, IUserContext userContext,
        IVoucherRepository voucherRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.userContext = userContext;
        this.voucherRepository = voucherRepository;
    }

    public async Task<VoucherResult<VouhcerListCustDto>> Handle(CustGetVouchersAvailableQuery request, CancellationToken cancellationToken)
    {
        var user = userContext.GetCurrentUser();
        if (user == null) throw new UnauthorizedAccessException("User is not logged in.");
        logger.LogInformation($"Get available voucher for userId: {user.Id}");

        var (FreeShipping, VoucherDiscount, VoucherPercentage) = await voucherRepository.CustomerGetAvailableVouchers(user.Id);

        var freeShippDto = FreeShipping?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();
        var voucherPercentDto = VoucherPercentage?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();
        var voucherDiscDto = VoucherDiscount?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();

        // Return the result
        return new VoucherResult<VouhcerListCustDto>(freeShippDto, voucherPercentDto, voucherDiscDto);
    }

}
