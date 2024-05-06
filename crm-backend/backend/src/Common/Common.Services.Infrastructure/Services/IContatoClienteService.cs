using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IContatoClienteService
    {
        Task<ContatoClienteDTO> GetById(int id, bool includeDeleted = false);
        Task<IList<ContatoClienteDTO>> GetAll(bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<ContatoClienteDTO> Edit(ContatoClienteDTO dto);
        Task<bool> BulkInsert(IList<ContatoClienteDTO> contatoClienteDTOs);
        Task<IList<ContatoClienteDTO>> GetAllFiltered(string start, string end, string projetoId);
    }
}