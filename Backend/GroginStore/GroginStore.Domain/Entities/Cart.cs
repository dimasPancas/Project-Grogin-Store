namespace GroginStore.Domain.Entities
{
    public class Cart
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }

        public User? User { get; set; }
        public Product? Product { get; set; }
    }
}
