using Common.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class UserRoleConfig : EntityTypeConfiguration<UserRole>
    {
        public UserRoleConfig()
        {
            ToTable("UserRoles");
            Property(obj => obj.RoleId).HasColumnName("RoleId").IsRequired();
            Property(obj => obj.UserId).HasColumnName("UserId").IsRequired();

            HasKey(key => new { key.UserId, key.RoleId });
        }
    }
}
