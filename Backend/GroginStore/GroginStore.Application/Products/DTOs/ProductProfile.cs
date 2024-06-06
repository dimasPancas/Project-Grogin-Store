using AutoMapper;
using GroginStore.Application.Products.Commands.CreateProduct;
using GroginStore.Application.Products.Commands.UpdateProduct;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Products.DTOs
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Product, ProductDetailDto>()
                .ForMember(p => p.Category, opt => opt.MapFrom(src => src.Category == null ? null : src.Category.Name));

            //admin
            CreateMap<Product, ProductListAdminDto>()
                .ForMember(p => p.Category, opt => opt.MapFrom(src => src.Category == null ? null : src.Category.Name));
            CreateMap<Product, ProductDetailAdminDto>()
                .ForMember(p => p.Category, opt => opt.MapFrom(src => src.Category == null ? null : src.Category.Name))
                .ForMember(p => p.CreatedBy, opt => opt.MapFrom(src => src.UserAdmin == null ? null : src.UserAdmin!.UserName))
                .ForMember(p => p.UpdatedBy, opt => opt.MapFrom(src => src.UserAdmin == null ? null : src.UserAdmin!.UserName));

            CreateMap<CreateProductCommand, Product>();
            CreateMap<UpdateProductCommand, Product>();
        }
    }
}
