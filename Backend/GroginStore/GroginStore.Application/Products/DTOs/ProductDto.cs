namespace GroginStore.Application.Products.DTOs
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
        public string ProductImage { get; set; } = default!;
        public int Stock { get; set; }
    }
}
