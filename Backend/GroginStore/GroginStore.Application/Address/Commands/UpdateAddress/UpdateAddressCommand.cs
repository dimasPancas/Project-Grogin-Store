using GroginStore.Application.Address.DTOs;
using MediatR;

namespace GroginStore.Application.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommand : IRequest<AddressDto>
    {
        public string? Id { get; set; }
        public string Province { get; set; } = default!;
        public string City { get; set; } = default!;
        public int PostalCode { get; set; }
        public string Village { get; set; } = default!;
        public string Street { get; set; } = default!;
    }
}
