using AutoMapper;
using GroginStore.Application.Deliveries.Command.CreateDelivery;
using GroginStore.Application.Deliveries.Command.UpdateDelivery;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Deliveries.DTOs
{
    public class DeliveryProfile : Profile
    {
        public DeliveryProfile()
        {
            CreateMap<Delivery, DelieryDto>();

            CreateMap<Delivery, DeliveryByIdDto>()
                .ForMember(data => data.UpdatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName))
                .ForMember(data => data.CreatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName));
            CreateMap<Delivery, AdminDeliveryDto>();


            CreateMap<CreateDeliveryCommand, Delivery>();
            CreateMap<UpdateDeliveryCommand, Delivery>();
        }
    }
}
