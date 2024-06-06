namespace GroginStore.Application.Wishlists.DTOs
{
    public class WishlistDto
    {
        public Guid Id { get; set; }
        public string ProductId { get; set; } = default!;
        public string? ProductName { get; set; }
        public string? ProductImage { get; set; }
        public decimal ProductPrice { get; set; }
        public string? Category { get; set; }
        public DateTime AddedDate { get; set; }
    }
}
