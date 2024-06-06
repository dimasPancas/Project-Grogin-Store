using GroginStore.Domain.Constant;

namespace GroginStore.Application.Vouchers.DTOs;

public class VoucherDetailByIdAdminDto
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; } 
    public decimal? MaxDiscountAmount { get; set; } 
    public int? MaxRedemptions { get; set; } 
    public int? CurrentRedemptions { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? ExpiryDate { get; set; }
}
