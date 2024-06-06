using MediatR;

namespace GroginStore.Application.Vouchers.Command.UserClaimVoucher;

public class UserClaimVoucherCommand : IRequest
{
    public UserClaimVoucherCommand(string voucherId)
    {
        VoucherId = voucherId;
    }

    public string VoucherId { get; }
}
