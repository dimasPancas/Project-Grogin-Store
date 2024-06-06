using AutoMapper;
using GroginStore.Application.Address.Commands.CreateAddress;
using GroginStore.Application.Address.Commands.UpdateAddress;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Address.DTOs;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<Addres, AddressDto>();
        CreateMap<Addres, AddressDetailByIdDto>();

        CreateMap<CreateAddressComand, Addres>();
        CreateMap<UpdateAddressCommand, Addres>();
    }
}
