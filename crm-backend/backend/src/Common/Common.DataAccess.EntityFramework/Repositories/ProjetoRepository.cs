using Common.Entities;
using Common.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Common.DataAccess.EntityFramework
{
    public class ProjetoRepository : BaseRepository<Projeto, DataContext>, IProjetoRepository<Projeto>
    {
        public async Task<Projeto> Update(Projeto obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            using (var context = GetContext(session))
            {
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<Projeto> GetById(int id, ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.Id == id)
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<IList<Projeto>> GetAll(ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .ToListAsync();
            }
        }

    }
}