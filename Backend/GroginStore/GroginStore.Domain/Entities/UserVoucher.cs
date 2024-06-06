namespace GroginStore.Domain.Entities;

   public class UserVoucher
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = default!;
        public Guid VoucherId { get; set; }
        public DateTime CLaimedAt {  get; set; }

        public User? User { get; set; }
        public Voucher? Voucher { get; set; }
    }

