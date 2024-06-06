namespace GroginStore.Application.Products.DTOs;

public class ProductListAdminDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }
    public int Stock {  get; set; }
    public string? Category { get; set; }
    public string ProductImage { get; set; } = default!;
    public bool IsActive { get; set; } = true;
}
