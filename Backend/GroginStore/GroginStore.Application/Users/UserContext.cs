using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace GroginStore.Application.Users
{
    public interface IUserContext
    {
        CurrentUser? GetCurrentUser();
    }

    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public CurrentUser? GetCurrentUser()
        {
            var user = httpContextAccessor?.HttpContext?.User;

            if (user == null) throw new InvalidOperationException("User context is not present");

            if (user.Identity == null || !user.Identity.IsAuthenticated) return null;

            var userIdClaim = user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier); // Menggunakan ClaimTypes.NameIdentifier

            if (userIdClaim == null) return null;

            var userId = userIdClaim.Value;
            var emailClaim = user.FindFirst(c => c.Type == ClaimTypes.Email);
            var email = emailClaim?.Value;

            var roleClaims = user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);

            return new CurrentUser(userId, email!, roleClaims);
        }

    }

}

