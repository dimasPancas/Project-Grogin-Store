using GroginStore.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Domain.Entities
{
    public class Addres
    {
        public Guid Id { get; set; }
        [MaxLength(25)]
        public string Province { get; set; } = default!;
        [MaxLength(20)]
        public string City { get; set; } = default!;
        public int PostalCode { get; set; }
        [MaxLength(20)]
        public string Village { get; set; } = default!;
        [MaxLength(30)]
        public string Street { get; set; } = default!;
        public string? UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public User? User { get; set; }
    }
}
