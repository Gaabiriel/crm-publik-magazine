using Common.DataAccess.EntityFramework.Configuration.System;
using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration
{
    public class SettingsConfig : BaseEntityConfig<Settings>
    {
        public SettingsConfig() : base("Settings")
        {
            Property(obj => obj.ThemeName).HasColumnName("ThemeName").IsRequired();
        }
    }
}