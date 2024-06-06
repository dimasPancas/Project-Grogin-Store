namespace GroginStore.Domain.Common
{
    public abstract class AuditTableEntity
    {
        public Guid Id { get; set; }
        public string? CreatedBy { get; set; }
        
        public string? UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; } = DateTime.Now;
        public DateTime? DeletedDate { get; set; }
        public bool IsActive { get; set; } = true;
    }

}
