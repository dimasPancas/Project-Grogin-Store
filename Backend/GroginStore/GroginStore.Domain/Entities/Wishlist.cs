namespace GroginStore.Domain.Entities
{
    public class Wishlist
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? UserId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime AddedDate { get; set; }

        public User? User { get; set; }
        public Product? Product { get; set; }

    }
}
