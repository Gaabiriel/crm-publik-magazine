using Common.Entities;
using Common.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Common.DataAccess.EntityFramework
{
    public class PropostaRepository : BaseRepository<Propostas, DataContext>, IPropostaRepository<Propostas>
    {
        public override async Task<Propostas> Edit(Propostas obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            using (var context = GetContext(session))
            {
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<Propostas> GetById(int id, ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.Id == id)
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<IList<Propostas>> GetAll(ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .ToListAsync();
            }
        }

        public async Task<IList<Propostas>> GetAllPropostaFiltered(ContextSession session, string start, string end, int projetoId, string statusProposta)
        {
            using (var context = GetContext(session))
            {
                var result = await GetEntities(context).Include(x => x.Cliente)
                  .Where(x => x.Cliente.ProjetoId == projetoId && x.Status.ToLower() == statusProposta.ToLower())
                  .ToListAsync();

                var resultWhereDates = result.Where(x => x.DataCriacao >= DateTime.Parse(start) &&
                         x.DataCriacao <= DateTime.Parse(end)).ToList();

                return resultWhereDates.Any() ? resultWhereDates : new List<Propostas>();

            }
        }
    }
}