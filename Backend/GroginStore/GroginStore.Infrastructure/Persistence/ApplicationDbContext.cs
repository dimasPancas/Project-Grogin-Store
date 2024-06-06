using GroginStore.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace GroginStore.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Addres> Addresses { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Voucher> Vouchers {  get; set; }
        public DbSet<UserVoucher> UserVouchers { get; set; }
        public DbSet<OrderVoucher> OrderVouchers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            //comment entity => n to n user:product
            builder.Entity<Comment>().HasKey(c => c.Id);
            builder.Entity<Comment>().HasOne(u => u.User).WithMany(c => c.Comments).HasForeignKey(u => u.UserId);
            builder.Entity<Comment>().HasOne(u => u.Product).WithMany(c => c.Comments).HasForeignKey(u => u.ProductId);
            builder.Entity<OrderDetail>().HasOne(od => od.Comment)
               .WithOne(c => c.OrderDetail)
               .HasForeignKey<Comment>(c => c.OrderDetailId)
               .OnDelete(DeleteBehavior.Restrict);


            //wishlist entity => n to n user:product
            builder.Entity<Wishlist>().HasKey(c => new { c.ProductId, c.UserId });
            builder.Entity<Wishlist>().HasOne(u => u.User).WithMany(w => w.Wishlists).HasForeignKey(u => u.UserId);
            builder.Entity<Wishlist>().HasOne(p => p.Product).WithMany(w => w.Wishlists).HasForeignKey(p => p.ProductId);

            //OrderVoucher => n to n order:voucher
            builder.Entity<OrderVoucher>().HasKey(ov => new { ov.OrderId, ov.VoucherId });
            builder.Entity<OrderVoucher>().HasOne(o => o.Order).WithMany(ov => ov.OrderVouchers).HasForeignKey(ov => ov.OrderId);
            builder.Entity<OrderVoucher>().HasOne(v => v.Voucher).WithMany(ov => ov.OrderVouchers).HasForeignKey(ov => ov.VoucherId);

            //userVoucher entity => n to n user:voucher
            builder.Entity<UserVoucher>().HasKey(uv => uv.Id);
            builder.Entity<UserVoucher>().HasOne(u => u.User).WithMany(uv => uv.UserVouchers).HasForeignKey(u => u.UserId);
            builder.Entity<UserVoucher>().HasOne(v => v.Voucher).WithMany(uv => uv.UserVouchers).HasForeignKey(v => v.VoucherId);

            //product
            builder.Entity<Product>().HasOne(p => p.UserAdmin).WithMany(u => u.Products).HasForeignKey(p => p.CreatedBy);
            builder.Entity<Product>().HasOne(p => p.UserAdmin).WithMany(u => u.Products).HasForeignKey(p => p.UpdatedBy);

            //payment
            builder.Entity<Payment>().HasOne(p => p.UserAdmin).WithMany(u => u.Payments).HasForeignKey(p => p.CreatedBy);
            builder.Entity<Payment>().HasOne(p => p.UserAdmin).WithMany(u => u.Payments).HasForeignKey(p => p.UpdatedBy);


            //delivery
            builder.Entity<Delivery>().HasOne(p => p.UserAdmin).WithMany(u => u.Deliveries).HasForeignKey(p => p.CreatedBy);
            builder.Entity<Delivery>().HasOne(p => p.UserAdmin).WithMany(u => u.Deliveries).HasForeignKey(p => p.UpdatedBy);

            //category
            builder.Entity<Category>().HasOne(p => p.UserAdmin).WithMany(u => u.Categories).HasForeignKey(p => p.CreatedBy);
            builder.Entity<Category>().HasOne(p => p.UserAdmin).WithMany(u => u.Categories).HasForeignKey(p => p.UpdatedBy);

        }
    }
}
