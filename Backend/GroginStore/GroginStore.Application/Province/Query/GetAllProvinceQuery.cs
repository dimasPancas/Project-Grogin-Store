
using GroginStore.Domain.Common;
using MediatR;

namespace GroginStore.Application.Province.Query
{
    public class GetAllProvinceQuery : IRequest<IEnumerable<Provinces>>
    {
      
    }
}
