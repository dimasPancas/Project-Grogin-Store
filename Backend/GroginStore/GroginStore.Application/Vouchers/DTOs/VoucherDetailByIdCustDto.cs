using GroginStore.Domain.Constant;
namespace GroginStore.Application.Vouchers.DTOs;

public class VoucherDetailByIdCustDto
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public VoucherType Type { get; set; }
    public decimal? DiscountValue { get; set; }
    public decimal? MaxDiscountAmount { get; set; }
    public DateTime? ExpiryDate { get; set; }
}
