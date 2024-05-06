using Common.Entities;
using Common.Services.Infrastructure;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Common.DataAccess.EntityFramework
{
    public class RoleRepository : BaseRepository<Role, DataContext>, IRoleRepository<Role>
    {
        public async Task<Role> Get(string name, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context).Where(obj => obj.Name == name).FirstOrDefaultAsync();
            }
        }

        public async Task<IList<Role>> GetAll(ContextSession session)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context).ToListAsync();
            }
        }
    }
}