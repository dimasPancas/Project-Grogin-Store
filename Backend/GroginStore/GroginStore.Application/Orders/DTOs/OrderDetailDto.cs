using GroginStore.Application.Comments.DTOs;
using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Orders.DTOs
{
    public class OrderDetailDto
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderStatus { get; set; }
        public string DeliveryName { get; set; } = string.Empty;
        public decimal DeliveryPrice { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal PaymentCost { get; set; }
        public decimal TotalAmount { get; set; }

        //address
        public string Province { get; set; } = default!;
        public string City { get; set; } = default!;
        public int PostalCode { get; set; }
        public string Village { get; set; } = default!;
        public string Street { get; set; } = default!;

        public List<ProductDetailOrderDto> ProductsDetailsOrder { get; set; } = new List<ProductDetailOrderDto>();
        public List<OrderVoucherDto> VouchersUsed { get; set; } = new List<OrderVoucherDto>();
    }

    public class ProductDetailOrderDto
    {
        public string? OrderDetailId { get; set; }
        public string ProductId { get; set; } = default!;
        public string ProductName { get; set; } = default!;
        public decimal ProductPrice { get; set; } = default!;
        public string ProductCategory { get; set; } = default!;
        public string ProductImage { get; set; } = default!;
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; } = default!;
        public CommentListDto? Comment { get; set; }
    }

    public class OrderVoucherDto
    {
        public string? Id { get; set; }
        public string Name { get; set; } = default!;
        public VoucherType Type { get; set; }
        public decimal? DiscountValue { get; set; }
        public decimal? MaxDiscountAmount { get; set; }
    }

}
