using GroginStore.Domain.Constant;

namespace GroginStore.Domain.Entities;

public class Voucher
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; } // Used for percentage or fixed amount discount
    public decimal? MaxDiscountAmount { get; set; } // Used for limiting the discount for percentage type
    public int? MaxRedemptions { get; set; } // Maximum number of redemptions
    public int? CurrentRedemptions { get; set; } // Current number of redemptions
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? ExpiryDate { get; set; }

    public List<UserVoucher>? UserVouchers { get; set; }
    public List<OrderVoucher?>? OrderVouchers { get; set; }
}

