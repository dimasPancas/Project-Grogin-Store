namespace GroginStore.Domain.Entities;

public class OrderVoucher
{
    public Guid VoucherId { get; set; }
    public Guid OrderId { get; set; }

    public Voucher? Voucher { get; set; }
    public Order? Order { get; set; }
}
