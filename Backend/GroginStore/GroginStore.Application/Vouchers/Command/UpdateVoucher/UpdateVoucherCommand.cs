using GroginStore.Domain.Constant;
using MediatR;

namespace GroginStore.Application.Vouchers.Command.UpdateVoucher;

public class UpdateVoucherCommand : IRequest
{
    public string? VoucherId { get; set; }
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; }
    public decimal? MaxDiscountAmount { get; set; }
    public int MaxRedemptions { get; set; }
    public DateTime? ExpiryDate { get; set; }
}
