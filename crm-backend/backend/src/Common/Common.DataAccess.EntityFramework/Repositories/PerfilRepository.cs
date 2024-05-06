using Common.Entities;
using Common.Services.Infrastructure;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Common.DataAccess.EntityFramework
{
    public class PerfilRepository : BaseRepository<Role, DataContext>, IPerfilRepository<Role>
    {
        public override async Task<Role> Edit(Role obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            using (var context = GetContext(session))
            {
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<Role> GetById(int id, ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.Id == id)
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<IList<Role>> GetAll(ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .ToListAsync();
            }
        }
    }
}