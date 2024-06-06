using GroginStore.Domain.Entities;
using GroginStore.Domain.IServices;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GroginStore.Application.Users.Commands.Login
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, string?>
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenServices tokenServices;
        private readonly SignInManager<User> signInManager;

        public LoginUserCommandHandler(UserManager<User> userManager, ITokenServices tokenServices, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.tokenServices = tokenServices;
            this.signInManager = signInManager;
        }


        public async Task<string?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await userManager.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null) return null;

            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password!, false);

            if (!result.Succeeded) return null;

            var token = await tokenServices.CreateToken(user);
            return token;
        }
    }

}
