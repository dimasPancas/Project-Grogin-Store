using GroginStore.Domain.Common;

namespace GroginStore.Domain.IServices;

public interface IProvinceService
{
    Task<IEnumerable<Provinces>> GetAllProvinces();
}
