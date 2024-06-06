using GroginStore.Application.Vouchers.DTOs;
using MediatR;

namespace GroginStore.Application.Vouchers.Queries.AdminGetDetailVoucherById;

public class AdminGetDetailVoucherByIdQuery : IRequest<VoucherDetailByIdAdminDto>
{
    public AdminGetDetailVoucherByIdQuery(string voucherId)
    {
        VoucherId = voucherId;
    }

    public string VoucherId { get; }
}
