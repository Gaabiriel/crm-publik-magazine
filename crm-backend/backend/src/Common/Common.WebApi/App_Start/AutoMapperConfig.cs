using AutoMapper.Configuration;
using Common.Services.Infrastructure.MappingProfiles;

namespace Common.WebApi
{
    public static class AutoMapperConfig
    {
        public static void Configure(MapperConfigurationExpression config)
        {
            config.AllowNullCollections = false;

            config.AddProfile<IdentityUserProfile>();
            config.AddProfile<UserProfile>();
            config.AddProfile<SettingsProfile>();
            config.AddProfile<ContatoClienteProfile>();
            config.AddProfile<ClienteProfile>();
        }
    }
}