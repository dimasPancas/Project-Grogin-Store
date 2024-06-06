using GroginStore.Application.Address.DTOs;
using MediatR;

namespace GroginStore.Application.Address.Queries.GetAllAddressByUserId
{
    public class GetAddressByUserIdQuery : IRequest<IEnumerable<AddressDto>>
    {
       
    }
}
