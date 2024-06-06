namespace GroginStore.Application.Payments.DTOs;

public class AdminPaymentDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public decimal PaymentCost { get; set; }
    public bool IsActive { get; set; }
}
