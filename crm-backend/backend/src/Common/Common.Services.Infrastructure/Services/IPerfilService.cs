using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IPerfilService
    {
        Task<RoleDTO> GetById(int id, bool includeDeleted = false);
        Task<IList<RoleDTO>> GetAll(bool includeDeleted = false);
        Task<RoleDTO> Edit(RoleDTO dto);
    }
}