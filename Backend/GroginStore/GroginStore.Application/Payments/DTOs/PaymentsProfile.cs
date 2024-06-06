using AutoMapper;
using GroginStore.Application.Payments.Commands.CreatePayment;
using GroginStore.Application.Payments.Commands.UpdatePayment;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Payments.DTOs;

public class PaymentsProfile : Profile
{
    public PaymentsProfile()
    {
        CreateMap<Payment, PaymentDto>();
        CreateMap<Payment, PaymentByIdDto>()
            .ForMember(data => data.UpdatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName))
            .ForMember(data => data.CreatedBy, opt => opt.MapFrom(src => src.UserAdmin!.UserName));
        CreateMap<Payment, AdminPaymentDto>();

        //command
        CreateMap<CreatePaymentCommand, Payment>();
        CreateMap<UpdatePaymentCommand, Payment>();
    }
}
