using Common.DTO;
using Common.Entities;
using Common.Services.Infrastructure;
using Common.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services
{
    public class PerfilService<TPerfil> : BaseService, IPerfilService where TPerfil : Role, new()
    {
        protected readonly IPerfilRepository<TPerfil> perfilRepository;

        public PerfilService(ICurrentContextProvider contextProvider, IPerfilRepository<TPerfil> perfilRepository) : base(contextProvider)
        {
            this.perfilRepository = perfilRepository;
        }

        public async Task<RoleDTO> Edit(RoleDTO dto)
        {
            var perfil = dto.MapTo<TPerfil>();
            await perfilRepository.Edit(perfil, Session);
            return perfil.MapTo<RoleDTO>();
        }

        public async Task<IList<RoleDTO>> GetAll(bool includeDeleted = false)
        {
            var perfil = await perfilRepository.GetAll(Session, includeDeleted);
            return perfil.MapTo<IList<RoleDTO>>();
        }

        public async Task<RoleDTO> GetById(int id, bool includeDeleted = false)
        {
            var perfil = await perfilRepository.GetById(id, Session, includeDeleted);
            return perfil.MapTo<RoleDTO>();
        }
    }
}