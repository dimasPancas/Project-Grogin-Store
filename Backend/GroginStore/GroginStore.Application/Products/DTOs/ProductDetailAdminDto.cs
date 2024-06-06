namespace GroginStore.Application.Products.DTOs;

public class ProductDetailAdminDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public decimal Price { get; set; }
    public string ProductImage { get; set; } = default!;
    public int Stock { get; set; }
    public string? Category { get; set; }
    public DateTime? CreatedDate { get; set; } = DateTime.Now;
    public DateTime? UpdatedDate { get; set; } = DateTime.Now;
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
