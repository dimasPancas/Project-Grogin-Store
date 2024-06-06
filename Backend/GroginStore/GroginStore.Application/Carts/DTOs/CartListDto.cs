namespace GroginStore.Application.Carts.DTOs;

public class CartListDto
{
    public Guid Id { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
    public string? ProductName { get; set; }
    public decimal ProductPrice { get; set; }
    public string? ProductImage { get; set; }
}
