using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IReuniaoClienteRepository<TReuniaoCliente> where TReuniaoCliente : ReuniaoCliente
    {
        Task<IList<TReuniaoCliente>> GetAll(ContextSession session, int idUsuario);
        Task<ReuniaoCliente> Edit(ReuniaoCliente reuniaoCliente, ContextSession session);
        Task<IList<TReuniaoCliente>> GetAllDailyReuniaoCliente(ContextSession session, int idUsuario);
        Task NotificarReuniao(ContextSession session, int id);
        Task<IList<TReuniaoCliente>> GetAllReuniaoFiltered(ContextSession session, string start, string end, int projetoId);
        Task<IList<TReuniaoCliente>> GetAllReuniaoByUsuarioId(ContextSession session, string start, string end, int usuarioId, string perfilEmpresa);
    }
}
