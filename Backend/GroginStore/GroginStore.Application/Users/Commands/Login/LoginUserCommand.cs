using MediatR;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Application.Users.Commands.Login
{
    public class LoginUserCommand : IRequest<string?>
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
