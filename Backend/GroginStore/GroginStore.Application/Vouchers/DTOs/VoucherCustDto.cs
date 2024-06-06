using GroginStore.Domain.Constant;

namespace GroginStore.Application.Vouchers.DTOs;

public class VoucherCustDto
{
    public Guid Id { get; set; }
    public string Code { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; } // Used for percentage or fixed amount discount
    public decimal? MaxDiscountAmount { get; set; } // Used for limiting the discount for percentage type
    public bool IsActive { get; set; } = true;
    public DateTime? ExpiryDate { get; set; }
}
