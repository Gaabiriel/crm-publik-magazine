using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.WebApi
{
    public interface IRoleService
    {
        Task<IdentityResult> AssignToRole(int userId, string roleName);
        Task<IdentityResult> UnassignRole(int userId, string roleName);
        Task<IList<string>> GetRoles(int userId);
    }
}