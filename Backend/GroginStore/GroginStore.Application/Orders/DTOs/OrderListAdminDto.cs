namespace GroginStore.Application.Orders.DTOs;

public class OrderListAdminDto
{
    public Guid Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string? CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
    public string? DeliveryName { get; set; }
    public int OrderStatus { get; set; }
}
