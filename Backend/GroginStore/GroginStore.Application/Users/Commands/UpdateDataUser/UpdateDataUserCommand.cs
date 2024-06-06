using MediatR;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Users.Commands.UpdateDataUser;

public class UpdateDataUserCommand : IRequest
{
    public string? Email { get; set; }
    public string? UserName { get; set; }
    public string? PhoneNumber { get; set; }
    public IFormFile? ProfilePicture { get; set; }
    //public string? UserProfile { get; set; }
}
