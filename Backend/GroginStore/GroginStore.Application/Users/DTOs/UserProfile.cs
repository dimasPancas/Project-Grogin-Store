using AutoMapper;
using GroginStore.Application.Users.Commands.Register;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Users.DTOs
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterUserCommand, User>();
            CreateMap<User, UserDto>();
            CreateMap<User, GetDetailUserDto>();
        }
    }
}
