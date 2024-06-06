namespace GroginStore.Application.Deliveries.DTOs;

public class AdminDeliveryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
}
