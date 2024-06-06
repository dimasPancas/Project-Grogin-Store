using Microsoft.AspNetCore.Identity;

namespace GroginStore.Domain.Entities
{
    public class User : IdentityUser
    {
        public string? UserProfile { get; set; }
        public bool? IsActive { get; set; } = true;

        public List<Addres>? Addresses { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Wishlist>? Wishlists { get; set; }
        public List<Product>? Products { get; set; }
        public List<Payment>? Payments { get; set; }
        public List<Delivery>? Deliveries { get; set; }
        public List<Category>? Categories { get; set; }
        public List<UserVoucher>? UserVouchers { get; set; }
    }
}
