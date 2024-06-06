using GroginStore.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Product : AuditTableEntity
    {
        [MaxLength(25)]
        public string Name { get; set; } = default!;
        [MaxLength(125)]
        public string Description { get; set; } = default!;
        public decimal Price { get; set; }
        public string ProductImage { get; set; } = default!;
        public int Stock { get; set; }

        public Guid CategoryId { get; set; }

        public Category? Category { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Wishlist>? Wishlists { get; set; }
        public User? UserAdmin { get; set; }
    }
}
