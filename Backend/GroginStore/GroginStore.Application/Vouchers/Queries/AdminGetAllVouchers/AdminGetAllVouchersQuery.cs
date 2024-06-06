using GroginStore.Application.Vouchers.DTOs;
using GroginStore.Domain.Constant;
using MediatR;

namespace GroginStore.Application.Vouchers.Queries.AdminGetAllVouchers;

public class AdminGetAllVouchersQuery : IRequest<IEnumerable<VoucherListAdminDto>>
{
    public bool? IsActive { get; set; }
    public VoucherType? Type { get; set; }
}
