using GroginStore.Domain.Constant;
namespace GroginStore.Application.Vouchers.DTOs;

public class VoucherListAdminDto
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; } // Used for percentage or fixed amount discount
    public decimal? MaxDiscountAmount { get; set; } // Used for limiting the discount for percentage type
    public int? MaxRedemptions { get; set; } // Maximum number of redemptions
    public bool IsActive { get; set; } = true;
    public DateTime? ExpiryDate { get; set; }
}
