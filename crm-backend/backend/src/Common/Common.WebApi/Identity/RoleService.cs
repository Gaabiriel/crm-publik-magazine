using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.WebApi.Identity
{
    public class RoleService<TUser, TRole> : IRoleService
        where TUser : Entities.User, IUser<int>
        where TRole : Entities.Role, IRole<int>, new()
    {
        protected readonly UserManager<TUser, int> userManager;
        protected readonly RoleManager<TRole, int> roleManager;

        public RoleService(UserManager<TUser, int> userManager, RoleManager<TRole, int> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<IdentityResult> AssignToRole(int userId, string roleName)
        {
            if (await roleManager.RoleExistsAsync(roleName))
            {
                return await userManager.AddToRoleAsync(userId, roleName);
            }

            return IdentityResult.Failed("Invalid role name");
        }

        public async Task<IdentityResult> UnassignRole(int userId, string roleName)
        {
            if (await roleManager.RoleExistsAsync(roleName))
            {
                return await userManager.RemoveFromRoleAsync(userId, roleName);
            }

            return IdentityResult.Failed("Invalid role name");
        }

        public Task<IList<string>> GetRoles(int userId)
        {
            return userManager.GetRolesAsync(userId);
        }
    }
}