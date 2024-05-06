using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class UserClaimConfig : BaseEntityConfig<UserClaim>
    {
        public UserClaimConfig() : base("UserClaims")
        {
            Property(obj => obj.ClaimType).HasColumnName("ClaimType").IsRequired();
            Property(obj => obj.ClaimValue).HasColumnName("ClaimValue").IsRequired();
        }
    }
}
