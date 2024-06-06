using GroginStore.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Payment : AuditTableEntity
    {
        [MaxLength(15)]
        public string Name { get; set; } = default!;
        public decimal PaymentCost { get; set; }

        public User? UserAdmin {  get; set; }
    }
}
