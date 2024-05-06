using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IProjetoRepository<TProjeto> where TProjeto : Projeto
    {
        Task Delete(int id, ContextSession session);
        Task<IList<TProjeto>> GetAll(ContextSession session, bool includeDeleted = false);
        Task<TProjeto> GetById(int id, ContextSession session, bool includeDeleted = false);
        Task<TProjeto> Update(TProjeto user, ContextSession session);
    }
}
