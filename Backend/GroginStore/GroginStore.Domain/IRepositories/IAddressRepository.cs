using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IAddressRepository
    {
        Task<IEnumerable<Addres?>?> GetAllAddressByUserId(string userId);
        Task<Addres?> GetDetailAddresById(string id);
        Task<Addres> CreateAddress(Addres data);
        Task SaveChanges();
    }
}
