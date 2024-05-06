using Common.Entities;
using Common.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Threading.Tasks;

namespace Common.DataAccess.EntityFramework
{
    public class ReuniaoClienteRepository : BaseRepository<ReuniaoCliente, DataContext>, IReuniaoClienteRepository<ReuniaoCliente>
    {
        public async Task<ReuniaoCliente> Edit(ReuniaoCliente obj, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                obj.Comeco = obj.Comeco.Value.AddHours(-3);
                obj.Fim = obj.Fim.Value.AddHours(-3);

                var usuarioCliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id == obj.IdCliente);

                if (usuarioCliente != null)
                    obj.IdUsuario = usuarioCliente.UsuarioId;

                var objectExists = await GetEntities(context).Where(x => x.Id == obj.Id).CountAsync() > 0;
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<IList<ReuniaoCliente>> GetAll(ContextSession session, int idUsuario)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context).Include(ob => ob.Cliente).Include(ob => ob.Usuario)
                    .Where(x => x.IdUsuario == idUsuario)
                    .ToListAsync();
            }
        }
        public async Task<IList<ReuniaoCliente>> GetAllDailyReuniaoCliente(ContextSession session, int idUsuario)
        {
            using (var context = GetContext(session))
            {
                var today = DateTime.Today;

                var result = await GetEntities(context)
                    .Where(x => x.IdUsuario == idUsuario)
                    .Where(x => System.Data.Entity.DbFunctions.TruncateTime(x.Comeco) == today)
                    .ToListAsync();

                return result;
            }
        }

        public async Task<IList<ReuniaoCliente>> GetAllReuniaoFiltered(ContextSession session, string start, string end, int projetoId)
        {
            using (var context = GetContext(session))
            {
                var result = await GetEntities(context).Include(x => x.Cliente).Include(x => x.Usuario)
                  .Where(x => x.Cliente.ProjetoId == projetoId)
                  .ToListAsync();

                var resultWhereDates = result.Where(x => x.Comeco >= DateTime.Parse(start) &&
                         x.Comeco <= DateTime.Parse(end)).ToList();

                return resultWhereDates.Any() ? resultWhereDates : new List<ReuniaoCliente>();

            }
        }

        public async Task<IList<ReuniaoCliente>> GetAllReuniaoByUsuarioId(ContextSession session, string start, string end, int usuarioId, string perfilEmpresa)
        {
            using (var context = GetContext(session))
            {
                var result = await GetEntities(context)
                    .Include(x => x.Cliente).
                    Include(x => x.Usuario)
                  .Where(x => x.Usuario.Id == usuarioId && x.Cliente.PerfilEmpresa.ToLower() == perfilEmpresa.ToLower())
                  .ToListAsync();

                var resultWhereDates = result.Where(x => x.Comeco >= DateTime.Parse(start) &&
                         x.Comeco <= DateTime.Parse(end)).ToList();


                return resultWhereDates.Any() ? resultWhereDates : new List<ReuniaoCliente>();

            }
        }

        public async Task NotificarReuniao(ContextSession session, int id)
        {
            using (var context = GetContext(session))
            {
                var reuniaoCliente = context.ReuniaoCliente.Find(id);

                reuniaoCliente.Notified = true;

                context.Entry(reuniaoCliente).State = EntityState.Modified;

                await context.SaveChangesAsync();
            }
        }
    }
}