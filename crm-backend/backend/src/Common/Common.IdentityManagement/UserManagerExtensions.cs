using Common.Entities;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Common.IdentityManagement
{
    public static class UserManagerExtensions
    {
        public static async Task<ClaimsIdentity> CreateIdentityAsync<TApplicationUser>(this UserManager<TApplicationUser, int> manager, TApplicationUser user)
            where TApplicationUser : User, IUser<int>, new()
        {
            return await manager.CreateIdentityAsync(user, "JWT");
        }

    }
}
