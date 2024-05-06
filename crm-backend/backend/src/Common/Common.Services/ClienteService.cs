using Common.DTO;
using Common.Entities;
using Common.Entities.Enums;
using Common.Entities.Helpers;
using Common.Services.Infrastructure;
using Common.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Services
{
    public class ClienteService<TCliente> : BaseService, IClienteService where TCliente : Cliente, new()
    {
        protected readonly IClienteRepository<TCliente> clienteRepository;
        protected readonly IReuniaoClienteRepository<ReuniaoCliente> reuniaoClienteRepository;
        protected readonly IUserService userService;


        public ClienteService(ICurrentContextProvider contextProvider,
            IClienteRepository<TCliente> clienteRepository,
            IReuniaoClienteRepository<ReuniaoCliente> reuniaoClienteRepository, IUserService userService = null) : base(contextProvider)
        {
            this.clienteRepository = clienteRepository;
            this.reuniaoClienteRepository = reuniaoClienteRepository;
            this.userService = userService;
        }

        public async Task<bool> Delete(int id)
        {
            await clienteRepository.Delete(id, Session);
            return true;
        }

        public async Task<ClienteDTO> Edit(ClienteDTO dto)
        {
            var cliente = dto.MapTo<TCliente>();
            await clienteRepository.Edit(cliente, Session);
            return cliente.MapTo<ClienteDTO>();
        }
        public async Task<ReuniaoClienteDTO> EditReuniao(ReuniaoClienteDTO dto)
        {
            var reuniaoCliente = dto.MapTo<ReuniaoCliente>();
            reuniaoCliente.Notified = false;
            await reuniaoClienteRepository.Edit(reuniaoCliente, Session);
            return reuniaoCliente.MapTo<ReuniaoClienteDTO>();
        }  

        public async Task<IList<ReuniaoClienteDTO>> GetAllReuniaoCliente(int idUsuario)
        {
            var cliente = await reuniaoClienteRepository.GetAll(Session, idUsuario);
            return cliente.MapTo<IList<ReuniaoClienteDTO>>();
        }

        public async Task<IList<ReuniaoClienteDTO>> GetAllDailyReuniaoCliente(int idUsuario)
        {
            var cliente = await reuniaoClienteRepository.GetAllDailyReuniaoCliente(Session, idUsuario);
            return cliente.MapTo<IList<ReuniaoClienteDTO>>();
        }

        public async Task<ClienteDTO> GetById(int id)
        {
            var cliente = await clienteRepository.GetById(id, Session);
            var clientesDto = cliente.MapTo<ClienteDTO>();

            if (clientesDto.UsuarioId > 0)
            {
                clientesDto.Usuario = await userService.GetById(clientesDto.UsuarioId);
            }

            return clientesDto;
        }
        public async Task<IList<ProjetoDTO>> GetProjetos(bool includeDeleted = false)
        {
            var projetos = await clienteRepository.GetProjetos(Session, includeDeleted);
            return projetos.MapTo<IList<ProjetoDTO>>();
        }
        public async Task<bool> BulkInsert(IList<ClienteDTO> clienteCsvDTO, int projetoId)
        {
            var projetosEnum = (ProjetosEnum)projetoId;
            var clientes = clienteCsvDTO.MapTo<IList<Cliente>>();
            var clienteList = clientes.ToList();
            clienteList.ForEach(c => c.ProjetoId = (int)projetosEnum);
            return await clienteRepository.BulkInsert(clienteList, Session);
        }
        public async Task AprovarCliente(int id)
        {
            await clienteRepository.AprovarCliente(id, Session);
        }

        public async Task FlagClienteContactada(int id)
        {
            await clienteRepository.FlagClienteContactada(id, Session);
        }

        public async Task NotificarReuniao(int id)
        {
            await reuniaoClienteRepository.NotificarReuniao(Session, id);
        }
        public async Task<IList<RelatorioClienteFieldDTO>> GetRelatorioClienteFieldsAsync()
        {
            var clienteRelatorioFields = await clienteRepository.GetRelatorioClienteFields(Session);
            return clienteRelatorioFields.MapTo<IList<RelatorioClienteFieldDTO>>();
        }

        public async Task<IList<RelatorioReuniaoClienteDTO>> GetAllReuniaoFiltered(string start, string end, int projetoId)
        {
            var reuniaoClientes = await reuniaoClienteRepository.GetAllReuniaoFiltered(Session, start, end, projetoId);

            return reuniaoClientes.MapTo<IList<RelatorioReuniaoClienteDTO>>();
        }

        public async Task<IList<RelatorioReuniaoClienteDTO>> GetAllReuniaoByUsuarioId(string start, string end, int usuarioId, string perfilEmpresa)
        {
            var reuniaoClientes = await reuniaoClienteRepository.GetAllReuniaoByUsuarioId(Session, start, end, usuarioId, perfilEmpresa);

            return reuniaoClientes.MapTo<IList<RelatorioReuniaoClienteDTO>>();
        }

        public async Task<IList<ClienteDTO>> GetAllPaged(bool onlyAprovado, int pageNo, int pageSize,
            string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null,
            int currentUserId = 0)
        {
            var cliente = await clienteRepository.GetAllPaged(Session, onlyAprovado, pageNo, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, currentUserId);

            var clientesDto = cliente.MapTo<IList<ClienteDTO>>();

            return clientesDto;
        }

        public Task<long> GetAllPagedCount(bool onlyAprovado, int pageNumber, int pageSize, string projeto, string usuario, string nomeFantasia, string razaoSocial, string telefoneFixo, string email, string atualizado, int currentUserId = 0)
        {
            return clienteRepository.GetAllPagedCount(Session, onlyAprovado, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, currentUserId);
        }

        public async Task<IList<ClienteAutoCompleteDTO>> GetAllForAutocomplete(bool onlyAprovado, int currentUserId = 0)
        {
            var ClienteAutoComplete = await clienteRepository.GetAllForAutocomplete(Session, onlyAprovado, currentUserId);

            var ClienteAutoCompleteDTO = ClienteAutoComplete.MapTo<IList<ClienteAutoCompleteDTO>>();
            return ClienteAutoCompleteDTO;
        }
    }
}