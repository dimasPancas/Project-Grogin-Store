using MediatR;
using System.ComponentModel.DataAnnotations;

namespace GroginStore.Application.Users.Commands.Register
{
    public class RegisterUserCommand : IRequest<string?>
    {
        [Required]
        public string? UserName { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? PhoneNumber { get; set; }
    }
}
