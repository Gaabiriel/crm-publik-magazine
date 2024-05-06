using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class RoleConfig : BaseEntityConfig<Role>
    {
        public RoleConfig() : base("Roles")
        {
            Property(obj => obj.Name).HasColumnName("Name");

            HasMany(r => r.UserRoles).WithRequired().HasForeignKey(ur => ur.RoleId);
        }
    }
}
