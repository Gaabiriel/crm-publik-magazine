using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IClienteService
    {
        Task<ClienteDTO> GetById(int id);  
        Task<bool> Delete(int id);
        Task<ClienteDTO> Edit(ClienteDTO dto);
        Task<IList<ProjetoDTO>> GetProjetos(bool includeDeleted = false);
        Task<bool> BulkInsert(IList<ClienteDTO> ClienteDTO, int projetoId);
        Task AprovarCliente(int id);
        Task FlagClienteContactada(int id);
        Task<ReuniaoClienteDTO> EditReuniao(ReuniaoClienteDTO dto);
        Task<IList<ReuniaoClienteDTO>> GetAllReuniaoCliente(int idUsuario);
        Task<IList<ReuniaoClienteDTO>> GetAllDailyReuniaoCliente(int currentUserId);
        Task NotificarReuniao(int id);
        Task<IList<RelatorioClienteFieldDTO>> GetRelatorioClienteFieldsAsync();
        Task<IList<RelatorioReuniaoClienteDTO>> GetAllReuniaoFiltered(string start, string end, int projetoId);
        Task<IList<RelatorioReuniaoClienteDTO>> GetAllReuniaoByUsuarioId(string start, string end, int usuarioId, string perfilEmpresa);
        Task<IList<ClienteDTO>> GetAllPaged(bool onlyAprovado, int pageNo, int pageSize, string sortOrder, string usuario, string nomeFantasia, string razaoSocial, string telefoneFixo, string email, string atualizado, int currentUserId);
        Task<long> GetAllPagedCount(bool onlyAprovado, int pageNumber, int pageSize, string projeto, string usuario, string nomeFantasia, string razaoSocial, string telefoneFixo, string email, string atualizado, int currentUserId);
        Task<IList<ClienteAutoCompleteDTO>> GetAllForAutocomplete(bool onlyAprovado, int currentUserId);
    }
}