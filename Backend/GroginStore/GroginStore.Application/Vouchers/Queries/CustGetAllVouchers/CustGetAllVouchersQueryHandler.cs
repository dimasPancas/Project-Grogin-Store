using AutoMapper;
using GroginStore.Application.Common;
using GroginStore.Application.Users;
using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Queries.CustGetAllVouchers;

public class CustGetAllVouchersQueryHandler : IRequestHandler<CustGetAllVouchersQuery, VoucherResult<VouhcerListCustDto>>
{
    private readonly ILogger<CustGetAllVouchersQueryHandler> logger;
    private readonly IUserContext userContext;
    private readonly IMapper mapper;
    private readonly IVoucherRepository voucherRepository;

    public CustGetAllVouchersQueryHandler(ILogger<CustGetAllVouchersQueryHandler> logger, IUserContext userContext, IMapper mapper, IVoucherRepository voucherRepository)
    {
        this.logger = logger;
        this.userContext = userContext;
        this.mapper = mapper;
        this.voucherRepository = voucherRepository;
    }


    public async Task<VoucherResult<VouhcerListCustDto>> Handle(CustGetAllVouchersQuery request, CancellationToken cancellationToken)
    {
        var user = userContext.GetCurrentUser();

        if (user == null) throw new InvalidOperationException("User not found.");

        var (FreeShipping, VoucherDiscount, VoucherPercentage) = await voucherRepository.CustomerGetAllVouchers(user.Id);

        var freeShippDto = FreeShipping?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();
        var voucherPercentDto = VoucherPercentage?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();
        var voucherDiscDto = VoucherDiscount?.Select(v => mapper.Map<VouhcerListCustDto>(v)).ToList();

        // Return the result
        return new VoucherResult<VouhcerListCustDto>(freeShippDto, voucherPercentDto, voucherDiscDto);
    }

}
