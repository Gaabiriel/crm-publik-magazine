using Common.Services;
using Common.Services.Infrastructure;
using Common.DataAccess.EntityFramework;
using Common.Entities;
using Unity;
using Unity.Extension;
using Common.Utils.Services;

namespace Common.DIContainer
{
    public class ContainerExtension : UnityContainerExtension
    {
        protected override void Initialize()
        {
            Container.RegisterType<ICsvService, CsvService>();
            Container.RegisterType<IUserPhotoRepository, UserPhotoRepository>();
            Container.RegisterType<ISettingsRepository, SettingsRepository>();
            Container.RegisterType<ISettingsService, SettingsService>();

            Container.RegisterType<IClienteService, ClienteService<Cliente>>();
            Container.RegisterType<IClienteRepository<Cliente>, ClienteRepository>();

            Container.RegisterType<IReuniaoClienteRepository<ReuniaoCliente>, ReuniaoClienteRepository>();

            Container.RegisterType<IPerfilService, PerfilService<Role>>();
            Container.RegisterType<IPerfilRepository<Role>, PerfilRepository>();


            Container.RegisterType<IContatoClienteService, ContatoClienteService<ContatoCliente>>();
            Container.RegisterType<IContatoClienteRepository<ContatoCliente>, ContatoClienteRepository>();

            Container.RegisterType<IPropostaService, PropostaService<Propostas>>();
            Container.RegisterType<IPropostaRepository<Propostas>, PropostaRepository>();

            Container.RegisterType<IProjetoService, ProjetoService<Projeto>>();
            Container.RegisterType<IProjetoRepository<Projeto>, ProjetoRepository>();

            Container.RegisterType<IUserService, UserService<User>>();
            Container.RegisterType<IUserRepository<User>, UserRepository>();
            Container.RegisterType<IIdentityUserRepository<User>, IdentityUserRepository>();
            Container.RegisterType<IRoleRepository<Role>, RoleRepository>();
            Container.RegisterType<IUserRoleRepository<UserRole>, UserRoleRepository>();
            Container.RegisterType<IUserClaimRepository<UserClaim>, UserClaimRepository>();
        }
    }
}
