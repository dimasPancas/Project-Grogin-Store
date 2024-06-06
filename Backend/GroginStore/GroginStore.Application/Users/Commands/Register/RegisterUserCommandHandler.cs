using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IServices;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GroginStore.Application.Users.Commands.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string?>
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenServices tokenServices;

        public RegisterUserCommandHandler(UserManager<User> userManager, ITokenServices tokenServices)
        {
            this.userManager = userManager;
            this.tokenServices = tokenServices;
        }


        public async Task<string?> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
            };

            var createdUser = await userManager.CreateAsync(user, request.Password!);

            if (createdUser.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(user, UserRoles.Customer);
                if (roleResult.Succeeded)
                {
                    string token = await tokenServices.CreateToken(user);
                    return token;
                }
            }

            return null;
        }
    }

}
