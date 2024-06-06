using AutoMapper;
using GroginStore.Application.Carts.Command.CreateCart;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Carts.DTOs;

public class CartProfile : Profile
{
    public CartProfile()
    {
        CreateMap<CreateCartCommand, Cart>();
        CreateMap<Cart, CartDto>();
        CreateMap<Cart, CartListDto>()
            .ForMember(c => c.ProductPrice, opt =>
                opt.MapFrom(p => p.Product!.Price))
            .ForMember(c => c.ProductName, opt => 
                opt.MapFrom(p => p.Product!.Name))
            .ForMember(c => c.ProductImage, opt => 
                opt.MapFrom(p => p.Product!.ProductImage));
    }
}
