namespace GroginStore.Application.Orders.DTOs
{
    public class OrderListDto
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? DeliveryName { get; set; }
        public int OrderStatus { get; set; }
    }
}
