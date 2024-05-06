using Microsoft.AspNet.Identity;

namespace Common.WebApi.Identity
{
    public class ApplicationRoleManager : RoleManager<ApplicationRole, int>
    {
        public ApplicationRoleManager(IRoleStore<ApplicationRole, int> store) : base(store)
        {
        }
    }
}