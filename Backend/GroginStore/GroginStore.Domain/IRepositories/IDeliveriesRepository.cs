using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IDeliveriesRepository
    {
        Task<IEnumerable<Delivery>> GetAllDeliveries();
        Task<IEnumerable<Delivery>> AdminGetAllDeliveries(bool? isActive);
        Task<Delivery?> GetDeliveryById(string id);
        Task<Delivery> CreateDelivery(Delivery data);
        Task SaveChanges();
    }
}
