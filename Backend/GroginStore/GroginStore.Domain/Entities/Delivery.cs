using GroginStore.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Delivery : AuditTableEntity
    {
        [MaxLength(20)]
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }

        public User? UserAdmin { get; set; }
    }
}
