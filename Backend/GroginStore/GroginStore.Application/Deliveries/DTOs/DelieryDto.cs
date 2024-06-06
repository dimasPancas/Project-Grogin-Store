﻿namespace GroginStore.Application.Deliveries.DTOs
{
    public class DelieryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
    }
}
