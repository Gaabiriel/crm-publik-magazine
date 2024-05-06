using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IRoleRepository<TRole> where TRole : Role
    {
        Task Delete(int id, ContextSession session);
        Task<TRole> Get(int id, ContextSession session);
        Task<TRole> Get(string name, ContextSession session);
        Task<TRole> Edit(TRole role, ContextSession session);
        Task<IList<TRole>> GetAll(ContextSession session);
    }
}