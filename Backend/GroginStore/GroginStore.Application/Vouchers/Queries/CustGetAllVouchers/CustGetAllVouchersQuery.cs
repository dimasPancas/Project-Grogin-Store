using GroginStore.Application.Common;
using GroginStore.Application.Vouchers.DTOs;
using MediatR;

namespace GroginStore.Application.Vouchers.Queries.CustGetAllVouchers;

public class CustGetAllVouchersQuery : IRequest<VoucherResult<VouhcerListCustDto>>
{

}
