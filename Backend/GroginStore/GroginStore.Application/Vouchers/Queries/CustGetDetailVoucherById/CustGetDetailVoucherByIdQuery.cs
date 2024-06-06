using GroginStore.Application.Vouchers.DTOs;
using MediatR;

namespace GroginStore.Application.Vouchers.Queries.CustGetDetailVoucherById;

public class CustGetDetailVoucherByIdQuery : IRequest<VoucherDetailByIdCustDto>
{
    public CustGetDetailVoucherByIdQuery(string voucherId)
    {
        VoucherId = voucherId;
    }

    public string VoucherId { get; }
}
