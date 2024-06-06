using AutoMapper;
using GroginStore.Application.Categories.Commands.CreateCategory;
using GroginStore.Application.Categories.Commands.UpdateCategory;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Categories.DTOs
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryDto>();

            CreateMap<Category, CategoryByIdDto>()
                .ForMember(data => data.UpdatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName))
                .ForMember(data => data.CreatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName));

            CreateMap<Category, AdminCategoryDto>();

            //command
            CreateMap<CreateCategoryCommand, Category>();
            CreateMap<UpdateCategoryCommand, Category>();
        }
    }
}
