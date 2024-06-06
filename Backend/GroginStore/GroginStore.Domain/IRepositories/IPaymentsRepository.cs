using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories
{
    public interface IPaymentsRepository
    {
        Task<IEnumerable<Payment>> GetAllPayments();
        Task<IEnumerable<Payment>> AdminGetAllPayments(bool? isActive);
        Task<Payment?> GetPaymentById(string id);
        Task<Payment> CreatePayment(Payment data);
        Task SaveChanges();
    }
}
