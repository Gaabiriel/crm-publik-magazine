using Common.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public abstract class BaseEntityConfig<TType> : EntityTypeConfiguration<TType>
        where TType : BaseEntity
    {
        protected BaseEntityConfig(string tableName)
        {
            ToTable(tableName);
            HasKey(obj => obj.Id);
        }
    }
}
