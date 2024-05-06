using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IPropostaRepository<TProposta> where TProposta : Propostas
    {
        Task Delete(int id, ContextSession session);
        Task<IList<TProposta>> GetAll(ContextSession session, bool includeDeleted = false);
        Task<TProposta> GetById(int id, ContextSession session, bool includeDeleted = false);
        Task<TProposta> Edit(TProposta user, ContextSession session);
        Task<IList<TProposta>> GetAllPropostaFiltered(ContextSession session, string start, string end, int projetoId, string statusProposta);
    }
}
