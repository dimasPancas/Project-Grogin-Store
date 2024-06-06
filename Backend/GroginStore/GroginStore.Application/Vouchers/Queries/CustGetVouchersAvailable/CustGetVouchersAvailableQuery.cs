using GroginStore.Application.Common;
using GroginStore.Application.Vouchers.DTOs;
using MediatR;

namespace GroginStore.Application.Vouchers.Queries.CustGetVouchersAvailable;

public class CustGetVouchersAvailableQuery : IRequest<VoucherResult<VouhcerListCustDto>>
{

}
