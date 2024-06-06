using GroginStore.Application.Users.DTOs;
using MediatR;

namespace GroginStore.Application.Users.Queries.GetAllUsers;

public class GetAllUsersQuery : IRequest<IEnumerable<UserDto>>
{

}
