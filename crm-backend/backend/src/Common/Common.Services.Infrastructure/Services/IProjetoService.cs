using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IProjetoService
    {
        Task<ProjetoDTO> GetById(int id, bool includeDeleted = false);
        Task<IList<ProjetoDTO>> GetAll(bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<ProjetoDTO> Update(ProjetoDTO dto);
    }
}