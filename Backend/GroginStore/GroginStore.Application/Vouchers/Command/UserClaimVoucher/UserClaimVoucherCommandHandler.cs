using AutoMapper;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Vouchers.Command.UserClaimVoucher;

public class UserClaimVoucherCommandHandler : IRequestHandler<UserClaimVoucherCommand>
{
    private readonly ILogger<UserClaimVoucherCommandHandler> logger;
    private readonly IMapper mapper;
    private readonly IUserVoucherRepository userVoucher;
    private readonly IUserContext userContext;
    private readonly IVoucherRepository voucherRepository;

    public UserClaimVoucherCommandHandler(ILogger<UserClaimVoucherCommandHandler> logger, IMapper mapper, IUserVoucherRepository userVoucher,
        IUserContext userContext, IVoucherRepository voucherRepository)
    {
        this.logger = logger;
        this.mapper = mapper;
        this.userVoucher = userVoucher;
        this.userContext = userContext;
        this.voucherRepository = voucherRepository;
    }

    public async Task Handle(UserClaimVoucherCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"User claim voucher with Id: {request.VoucherId}");
        var user = userContext.GetCurrentUser();
        if (user == null) throw new UnauthorizedAccessException("User is not logged in.");


        var voucher = await voucherRepository.GetVoucherById(request.VoucherId);
        if (voucher == null) throw new NotFoundException(nameof(Voucher), request.VoucherId!);

        if (!voucher.IsActive || (voucher.ExpiryDate.HasValue && voucher.ExpiryDate <= DateTime.Now))
            throw new InvalidOperationException("Voucher is not valid");

        if (voucher.MaxRedemptions.HasValue && voucher.CurrentRedemptions >= voucher.MaxRedemptions)
            throw new InvalidOperationException("Voucher has reached its maximum number of redemptions.");

        //cek if user has already claim vocuher
        var alreadyClaim = await userVoucher.HasUserClaimedVoucher(user.Id, request.VoucherId);
        if (alreadyClaim) throw new InvalidOperationException("User has already claimed this voucher.");


        var userVoucherModel = mapper.Map<UserVoucher>(request);
        userVoucherModel.CLaimedAt = DateTime.Now;
        userVoucherModel.UserId = user.Id;

        await userVoucher.CreateVoucherUserClaim(userVoucherModel);

        //update voucher redemptions
        if (voucher.CurrentRedemptions == null)
        {
            voucher.CurrentRedemptions = 1;
        }
        else if(voucher.CurrentRedemptions != null && voucher.CurrentRedemptions.HasValue)
        {
            voucher.CurrentRedemptions += 1;
            //if (voucher.CurrentRedemptions == voucher.MaxRedemptions || voucher.ExpiryDate <= DateTime.Now) voucher.IsActive = false;
        }

        await voucherRepository.SaveChanges();
    }
}
