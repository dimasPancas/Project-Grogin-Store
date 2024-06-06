﻿namespace GroginStore.Application.Payments.DTOs
{
    public class PaymentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal PaymentCost { get; set; }
    }
}
