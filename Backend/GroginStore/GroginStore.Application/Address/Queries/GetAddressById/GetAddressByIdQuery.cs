using GroginStore.Application.Address.DTOs;
using MediatR;

namespace GroginStore.Application.Address.Queries.GetAddressById
{
    public class GetAddressByIdQuery : IRequest<AddressDetailByIdDto>
    {
        public GetAddressByIdQuery(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }
}
