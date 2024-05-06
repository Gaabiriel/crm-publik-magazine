using Common.Entities;
using Common.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Common.DataAccess.EntityFramework
{
    public class ContatoClienteRepository : BaseRepository<ContatoCliente, DataContext>, IContatoClienteRepository<ContatoCliente>
    {
        public override async Task<ContatoCliente> Edit(ContatoCliente obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            using (var context = GetContext(session))
            {
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<ContatoCliente> GetById(int id, ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.Id == id)
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<IList<ContatoCliente>> GetAll(ContextSession session, bool includeDeleted = false)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .ToListAsync();
            }
        }


        public async Task<bool> BulkInsert(IList<ContatoCliente> obj, ContextSession session)
        {
            var successfullyInsert = false;
            using (TransactionScope scope = new TransactionScope())
            {
                var context = GetContext(session);
                try
                {
                    context.BulkInsert(obj);

                    successfullyInsert = true;
                }
                catch (Exception ex)
                {
                    successfullyInsert = false;
                }
                finally
                {
                    if (context != null)
                        context.Dispose();
                }

                scope.Complete();

            }
            return successfullyInsert;
        }
        private dynamic AddToContext(
            dynamic context,
            ContatoCliente entity,
            int count,
            int commitCount,
            bool recreateContext,
            ContextSession session)
        {
            context.Set<ContatoCliente>().Add(entity);

            if (count % commitCount == 0)
            {
                context.SaveChanges();
                if (recreateContext)
                {
                    context.Dispose();
                    context = GetContext(session);
                    context.Configuration.AutoDetectChangesEnabled = false;
                }
            }

            return context;
        }
    }
}