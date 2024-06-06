using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories;

public interface ICommentRepository
{
    Task<Comment?> CreateComment(Comment comment);
    Task DeleteComment(Comment comment);
    Task<IEnumerable<Comment>> GetAllCommentsByProductId(string productId);
    Task<Comment?> GetCommentById(string id);
    Task SaveChanges();
    Task<IEnumerable<Comment?>?> GetAllCommentsByUserId(string userId);
}
