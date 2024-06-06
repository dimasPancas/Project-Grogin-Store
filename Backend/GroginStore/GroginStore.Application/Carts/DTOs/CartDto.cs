namespace GroginStore.Application.Carts.DTOs
{
    public class CartDto
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }
    }
}
