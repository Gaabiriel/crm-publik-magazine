using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IPropostaService
    {
        Task<PropostasDTO> GetById(int id, bool includeDeleted = false);
        Task<IList<PropostasDTO>> GetAll(bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<PropostasDTO> Edit(PropostasDTO dto);
        Task<IList<RelatorioPropostaClienteDTO>> GetAllPropostaFiltered(string start, string end, int projetoId, string statusProposta);
    }
}