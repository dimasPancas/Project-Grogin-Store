using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ProductId { get; set; }
        public string? UserId { get; set; }
        public Guid OrderDetailId { get; set; } // Foreign key to OrderDetail

        public string CommentText { get; set; } = default!;
        public int? Rating { get; set; }
        public DateTime CommentDate { get; set; }
        public string? CommentImg { get; set; }

        public Product? Product { get; set; }
        public User? User { get; set; }
        public OrderDetail OrderDetail { get; set; } = default!; // Navigation property to OrderDetail
    }
}
