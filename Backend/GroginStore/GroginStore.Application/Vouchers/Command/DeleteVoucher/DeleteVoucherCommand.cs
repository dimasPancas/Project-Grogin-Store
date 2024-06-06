using MediatR;

namespace GroginStore.Application.Vouchers.Command.DeleteVoucher;

public class DeleteVoucherCommand : IRequest
{
    public DeleteVoucherCommand(string voucherId)
    {
        VoucherId = voucherId;
    }

    public string VoucherId { get; }
}
