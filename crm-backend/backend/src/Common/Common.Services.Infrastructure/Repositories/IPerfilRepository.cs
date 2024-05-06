using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IPerfilRepository<TPerfil> where TPerfil : Role
    {
        Task<IList<TPerfil>> GetAll(ContextSession session, bool includeDeleted = false);
        Task<TPerfil> GetById(int id, ContextSession session, bool includeDeleted = false);
        Task<TPerfil> Edit(TPerfil user, ContextSession session);
    }
}
