namespace GroginStore.Domain.Entities;

public class OrderDetail
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }

    public Order? Order { get; set; }
    public Product? Product { get; set; }
    public Comment? Comment { get; set; } // Navigation property to Comment
}
