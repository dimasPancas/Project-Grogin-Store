namespace GroginStore.Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? PaymentVerificationCode { get; set; }
    public bool PaymentVerified { get; set; } = false;

    public string? UserId { get; set; }
    public Guid PaymentId { get; set; }
    public Guid AddresId { get; set; }
    public Guid DeliveryId { get; set; }
    public int OrderStatus { get; set; }

    public User? User { get; set; }
    public Payment? Payment { get; set; }
    public Addres? Addres { get; set; }
    public Delivery? Delivery { get; set; }

    public IEnumerable<OrderDetail>? OrderDetails {  get; set; }
    public List<OrderVoucher?>? OrderVouchers { get; set; }
}
 