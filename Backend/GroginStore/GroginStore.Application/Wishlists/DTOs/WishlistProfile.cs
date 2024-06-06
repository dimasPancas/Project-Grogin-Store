using AutoMapper;
using GroginStore.Application.Wishlists.Command.AddWishlist;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Wishlists.DTOs
{
    public class WishlistProfile : Profile
    {
        public WishlistProfile()
        {
            CreateMap<Wishlist, WishlistDto>()
                .ForMember(w => w.ProductName, opt => opt.MapFrom(w => w.Product!.Name))
                .ForMember(w => w.ProductImage, opt => opt.MapFrom(w => w.Product!.ProductImage))
                .ForMember(w => w.ProductPrice, opt => opt.MapFrom(w => w.Product!.Price))
                .ForMember(w => w.Category, opt => opt.MapFrom(w => w.Product!.Category!.Name));


            CreateMap<AddWishlistCommand, Wishlist>();
        }
    }
}
