using Common.Entities;
using Common.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Transactions;

namespace Common.DataAccess.EntityFramework
{
    public class ClienteRepository : BaseRepository<Cliente, DataContext>, IClienteRepository<Cliente>
    {
        public override async Task<Cliente> Edit(Cliente obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            using (var context = GetContext(session))
            {
                context.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;

                await context.SaveChangesAsync();
                return obj;
            }
        }

        public async Task<Cliente> GetById(int id, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.Id == id)
                    .Include(u => u.Projeto)
                    .FirstOrDefaultAsync();
            }
        } 
         
        public async Task<IList<Cliente>> GetAllFiltered(ContextSession session,
            DateTime comeco,
            DateTime fim,
            int projetoId)
        {
            using (var context = GetContext(session))
            {
                var query = await GetEntities(context)
                      .Where(obj => obj.Aprovado == true || obj.Aprovado == false)
                      .Include(u => u.Projeto).ToListAsync();

                if (projetoId > 0)
                {
                    query = query.Where(obj => obj.ProjetoId == projetoId).ToList();
                }

                if (comeco != null && fim != null)
                {
                    var reunioes = await context.ReuniaoCliente.Where(x => x.Comeco >= comeco && x.Fim <= fim).ToListAsync();
                    if (reunioes.Any())
                    {
                        query = query.Where(x => reunioes.Any(r => r.IdCliente == x.Id)).ToList();
                    }
                }
                var res = query.ToList();
                return res;
            }
        }

        public async Task<IList<Projeto>> GetProjetos(ContextSession session, object includeDeleted)
        {
            using (var context = GetContext(session))
            {
                return await context.Projetos
                    .ToListAsync();
            }
        }
        public async Task<bool> BulkInsert(IList<Cliente> obj, ContextSession session)
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

        public async Task AprovarCliente(int id, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                var cliente = context.Clientes.Find(id);

                cliente.Aprovado = true;

                context.Entry(cliente).State = EntityState.Modified;

                await context.SaveChangesAsync();
            }
        }

        public async Task FlagClienteContactada(int id, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                var cliente = context.Clientes.Find(id);

                cliente.Contactada = true;

                context.Entry(cliente).State = EntityState.Modified;

                await context.SaveChangesAsync();
            }
        }

        public async Task<Cliente> GetByNomeFantasiaOrRazaoSocial(string nomeCliente, ContextSession session)
        {
            using (var context = GetContext(session))
            {
                return await GetEntities(context)
                    .Where(obj => obj.NomeFantasia.Equals(nomeCliente, StringComparison.OrdinalIgnoreCase) ||
                                  obj.RazaoSocial.Equals(nomeCliente, StringComparison.OrdinalIgnoreCase))
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<IList<RelatorioClienteField>> GetRelatorioClienteFields(ContextSession session)
        {
            using (var context = GetContext(session))
            {
                return await context.RelatorioClienteFields
                    .ToListAsync();
            }
        }
        public async Task<long> GetAllPagedCount(ContextSession session, bool onlyAprovado,
            string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null, int currentUserId = 0)
        {
            using (var context = GetContext(session))
            {
                var clientes = context.Clientes.AsNoTracking()
                        .Include(obj => obj.Projeto)
                        .Include(obj => obj.Usuario)
                        .Where(obj => obj.Aprovado == onlyAprovado)
                        .AsQueryable();

                if (!string.IsNullOrWhiteSpace(projeto))
                {
                    clientes = clientes.Where(obj => obj.Projeto.Nome.Contains(projeto));
                }

                if (!string.IsNullOrWhiteSpace(nomeFantasia))
                {
                    clientes = clientes.Where(obj => obj.NomeFantasia.Contains(projeto));
                }

                if (!string.IsNullOrWhiteSpace(razaoSocial))
                {
                    clientes = clientes.Where(obj => obj.RazaoSocial.Contains(projeto));
                }

                if (!string.IsNullOrWhiteSpace(telefoneFixo))
                {
                    clientes = clientes.Where(obj => obj.TelefoneFixo.Contains(projeto));
                }

                if (!string.IsNullOrWhiteSpace(email))
                {
                    clientes = clientes.Where(obj => obj.Email.Contains(projeto));
                }

                if (!string.IsNullOrWhiteSpace(usuario))
                {
                    clientes = clientes.Where(obj => obj.Usuario.FirstName.Contains(projeto));
                }

                if (currentUserId > 0)
                {
                    clientes = clientes.Where(obj => obj.Usuario.Id == currentUserId);
                }

                return await clientes.CountAsync();
            }
        }
        public async Task<IList<Cliente>> GetAllPaged(ContextSession session, bool onlyAprovado, int pageNo, int pageSize,
            string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null, int currentUserId = 0)
        {
            using (var context = GetContext(session))
            {
                var clientes = context.Clientes.AsNoTracking()
                        .Include(obj => obj.Projeto)
                        .Include(obj => obj.Usuario)
                        .Where(obj => obj.Aprovado == onlyAprovado)
                        .OrderBy(obj => obj.NomeFantasia)
                        .AsQueryable();

                if (!string.IsNullOrWhiteSpace(projeto))
                {
                    clientes = clientes.Where(obj => obj.Projeto.Nome.ToUpper().Contains(projeto.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(nomeFantasia))
                {
                    clientes = clientes.Where(obj => obj.NomeFantasia.ToUpper().Contains(nomeFantasia.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(razaoSocial))
                {
                    clientes = clientes.Where(obj => obj.RazaoSocial.ToUpper().Contains(razaoSocial.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(telefoneFixo))
                {
                    clientes = clientes.Where(obj => obj.TelefoneFixo.ToUpper().Contains(telefoneFixo.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(email))
                {
                    clientes = clientes.Where(obj => obj.Email.ToUpper().Contains(email.ToUpper()));
                }

                if (!string.IsNullOrWhiteSpace(usuario))
                {
                    clientes = clientes.Where(obj => obj.Usuario.FirstName.ToUpper().Contains(usuario.ToUpper()));
                }

                if (currentUserId > 0)
                {
                    clientes = clientes.Where(obj => obj.Usuario.Id == currentUserId);
                }

                return await clientes.Skip((pageNo - 1) * pageSize)
                        .Take(pageSize).ToListAsync();
            }
        }

        public async Task<IList<ClienteAutoComplete>> GetAllForAutocomplete(ContextSession session, bool onlyAprovado, int currentUserId = 0)
        {
            using (var context = GetContext(session))
            {
                var clientes = context.Clientes.AsQueryable();

                if (currentUserId > 0)
                {
                    clientes = clientes.Where(obj => obj.Usuario.Id == currentUserId);
                }

                return await clientes.Select(obj => new ClienteAutoComplete { Id = obj.Id, Nome = obj.NomeFantasia }).ToListAsync();
            }
        }
    }
}