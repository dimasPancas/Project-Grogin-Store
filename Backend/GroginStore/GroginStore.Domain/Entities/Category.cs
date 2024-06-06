using GroginStore.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Category : AuditTableEntity
    {
        [MaxLength(15)]
        public string Name { get; set; } = default!;

        public List<Product> Products { get; set; } = new();
        public User? UserAdmin { get; set; }
    }
}
