using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext context;

        public CommentRepository(ApplicationDbContext context)
        {
            this.context = context;
        }


        public async Task<Comment?> CreateComment(Comment comment)
        {
            await context.Comments.AddAsync(comment);
            await context.SaveChangesAsync();
            var result = await context.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == comment.Id);
            return result;
        }

        public async Task DeleteComment(Comment comment)
        {
            context.Comments.Remove(comment);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Comment>> GetAllCommentsByProductId(string productId)
        {
            return await context.Comments.Where(c => c.ProductId.ToString() == productId).Include(c => c.User).ToListAsync();
        }

        public async Task<IEnumerable<Comment?>?> GetAllCommentsByUserId(string userId)
        {
            var comments = await context.Comments.Where(c => c.UserId!.ToString() == userId).ToListAsync();
            if (comments.Any()) return comments;
            return null;
        }

        public async Task<Comment?> GetCommentById(string id)
        {
            var comment = await context.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id.ToString() == id);
            if (comment == null) return null;
            return comment;
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }
    }
}
