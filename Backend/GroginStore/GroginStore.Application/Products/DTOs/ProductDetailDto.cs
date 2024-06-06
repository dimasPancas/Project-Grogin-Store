namespace GroginStore.Application.Products.DTOs;

public class ProductDetailDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public decimal Price { get; set; }
    public string ProductImage { get; set; } = default!;
    public string? CategoryId { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; } = default!;
    public DateTime? UpdatedDate { get; set; }
}
