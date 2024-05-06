using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IClienteRepository<TCliente> where TCliente : Cliente
    {
        Task Delete(int id, ContextSession session); 
        Task<TCliente> GetById(int id, ContextSession session);
        Task<TCliente> Edit(TCliente user, ContextSession session);
        Task<IList<Projeto>> GetProjetos(ContextSession session, object includeDeleted);
        Task<bool> BulkInsert(IList<Cliente> obj, ContextSession session);
        Task AprovarCliente(int id, ContextSession session);
        Task<Cliente> GetByNomeFantasiaOrRazaoSocial(string nomeCliente, ContextSession session);
        Task<IList<RelatorioClienteField>> GetRelatorioClienteFields(ContextSession session);
        Task FlagClienteContactada(int id, ContextSession session); 
        Task<long> GetAllPagedCount(ContextSession session, bool onlyAprovado,
            string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null, int currentUserId = 0);
        Task<IList<Cliente>> GetAllPaged(ContextSession session, bool onlyAprovado, int pageNo, int pageSize, string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null, int currentUserId = 0);
        Task<IList<ClienteAutoComplete>> GetAllForAutocomplete(ContextSession session, bool onlyAprovado, int currentUserId = 0);
    }
}
