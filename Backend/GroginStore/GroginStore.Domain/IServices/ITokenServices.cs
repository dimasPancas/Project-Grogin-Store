using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IServices
{
    public interface ITokenServices
    {
        Task<string> CreateToken(User user);
    }
}
