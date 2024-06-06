
using GroginStore.Domain.Constant;
using GroginStore.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;

namespace GroginStore.Infrastructure.Seeder
{
    public class RoleSeeder : IRoleSeeder
    {
        private readonly ApplicationDbContext context;

        public RoleSeeder(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task Seed()
        {
            if(await context.Database.CanConnectAsync())
            {
                if (!context.Roles.Any())
                {
                    var roles = GetRoles();
                    context.Roles.AddRange(roles);
                    await context.SaveChangesAsync();
                }
            }
        }


        private IEnumerable<IdentityRole> GetRoles()
        {
            List<IdentityRole> roles =
                [
                    new()
                    {
                        Name = UserRoles.Admin,
                        NormalizedName = UserRoles.Admin.ToUpper(),
                    },
                    new()
                    {
                        Name = UserRoles.Customer,
                        NormalizedName = UserRoles.Customer.ToUpper(),
                    },
                ];

            return roles;
        }
    }
}
