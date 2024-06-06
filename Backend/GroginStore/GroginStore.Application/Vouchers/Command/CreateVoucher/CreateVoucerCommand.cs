using GroginStore.Domain.Constant;
using MediatR;

namespace GroginStore.Application.Vouchers.Command.CreateVoucher;

public class CreateVoucerCommand : IRequest
{
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; } 
    public decimal? MaxDiscountAmount { get; set; }
    public int MaxRedemptions { get; set; }
    public DateTime? ExpiryDate { get; set; }
}
