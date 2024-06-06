using AutoMapper;
using GroginStore.Application.Carts.Command.CreateCart;
using GroginStore.Application.Orders.Command.CreateOrderFromCartUser;
using GroginStore.Application.Orders.Command.CreateOrderFromProduct;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Orders.DTOs
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderListDto>()
                .ForMember(o => o.DeliveryName, opt => opt.MapFrom(o => o.Delivery!.Name));

            CreateMap<CreateOrderFromCartUserCommand, Order>();

            CreateMap<Order, OrderDetailDto>()
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => src.OrderDate))
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => src.OrderStatus))
                .ForMember(dest => dest.DeliveryName, opt => opt.MapFrom(src => src.Delivery!.Name))
                .ForMember(dest => dest.DeliveryPrice, opt => opt.MapFrom(src => src.Delivery!.Price))
                .ForMember(dest => dest.PaymentMethod, opt => opt.MapFrom(src => src.Payment!.Name))
                .ForMember(dest => dest.PaymentCost, opt => opt.MapFrom(src => src.Payment!.PaymentCost))
                .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.TotalAmount))
                .ForMember(dest => dest.Province, opt => opt.MapFrom(src => src.Addres!.Province))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Addres!.City))
                .ForMember(dest => dest.PostalCode, opt => opt.MapFrom(src => src.Addres!.PostalCode))
                .ForMember(dest => dest.Village, opt => opt.MapFrom(src => src.Addres!.Village))
                .ForMember(dest => dest.Street, opt => opt.MapFrom(src => src.Addres!.Street))
                .ForMember(dest => dest.ProductsDetailsOrder, opt => opt.MapFrom(src => src.OrderDetails))
                .ForMember(dest => dest.VouchersUsed, opt => opt.MapFrom(src => src.OrderVouchers));

            CreateMap<OrderDetail, ProductDetailOrderDto>()
                .ForMember(dest => dest.OrderDetailId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId.ToString()))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product!.Name))
                .ForMember(dest => dest.ProductPrice, opt => opt.MapFrom(src => src.Product!.Price))
                .ForMember(dest => dest.ProductCategory, opt => opt.MapFrom(src => src.Product!.Category!.Name))
                .ForMember(dest => dest.ProductImage, opt => opt.MapFrom(src => src.Product!.ProductImage))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Subtotal, opt => opt.MapFrom(src => src.Subtotal))
                .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.Comment));

            CreateMap<OrderVoucher, OrderVoucherDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Voucher.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Voucher.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Voucher.Type))
                .ForMember(dest => dest.DiscountValue, opt => opt.MapFrom(src => src.Voucher.DiscountValue))
                .ForMember(dest => dest.MaxDiscountAmount, opt => opt.MapFrom(src => src.Voucher.MaxDiscountAmount));


            //admin
            CreateMap<Order, OrderListAdminDto>()
                .ForMember(data => data.CustomerName, opt => opt.MapFrom(src => src.User!.UserName));
        }
    }


}
