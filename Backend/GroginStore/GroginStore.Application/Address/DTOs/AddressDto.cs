namespace GroginStore.Application.Address.DTOs
{
    public class AddressDto
    {
        public Guid Id { get; set; }
        public string Province { get; set; } = default!;
        public string City { get; set; } = default!;
        public int PostalCode { get; set; }
        public string Village { get; set; } = default!;
        public string Street { get; set; } = default!;
    }
}
