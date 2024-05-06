using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IContatoClienteRepository<TContatoCliente> where TContatoCliente : ContatoCliente
    {
        Task Delete(int id, ContextSession session);
        Task<IList<TContatoCliente>> GetAll(ContextSession session, bool includeDeleted = false);
        Task<TContatoCliente> GetById(int id, ContextSession session, bool includeDeleted = false);
        Task<TContatoCliente> Edit(TContatoCliente user, ContextSession session);
        Task<bool> BulkInsert(IList<ContatoCliente> contatosCliente, ContextSession session);
    }
}
