using Common.DTO;
using Common.Entities;
using Common.Services.Infrastructure;
using Common.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services
{
    public class ContatoClienteService<TContatoCliente> : BaseService, IContatoClienteService where TContatoCliente : ContatoCliente, new()
    {
        protected readonly IContatoClienteRepository<TContatoCliente> contatoClienteRepository;
        protected readonly IClienteRepository<Cliente> clienteRepository;

        public ContatoClienteService(ICurrentContextProvider contextProvider,
            IContatoClienteRepository<TContatoCliente> contatoClienteRepository,
            IClienteRepository<Cliente> clienteRepository) : base(contextProvider)
        {
            this.contatoClienteRepository = contatoClienteRepository;
            this.clienteRepository = clienteRepository;
        }

        public async Task<bool> Delete(int id)
        {
            await contatoClienteRepository.Delete(id, Session);
            return true;
        }

        public async Task<ContatoClienteDTO> Edit(ContatoClienteDTO dto)
        {
            var contatoCliente = dto.MapTo<TContatoCliente>();
            await contatoClienteRepository.Edit(contatoCliente, Session);
            return contatoCliente.MapTo<ContatoClienteDTO>();
        }

        public async Task<IList<ContatoClienteDTO>> GetAll(bool includeDeleted = false)
        {
            var contatoCliente = await contatoClienteRepository.GetAll(Session, includeDeleted);
            return contatoCliente.MapTo<IList<ContatoClienteDTO>>();
        }

        public async Task<ContatoClienteDTO> GetById(int id, bool includeDeleted = false)
        {
            var contatoCliente = await contatoClienteRepository.GetById(id, Session, includeDeleted);
            return contatoCliente.MapTo<ContatoClienteDTO>();
        }

        public async Task<bool> BulkInsert(IList<ContatoClienteDTO> contatoClienteDTOs)
        {
            var contatosClienteNotMatched = new List<ContatoClienteDTO>();
            foreach (var contato in contatoClienteDTOs)
            {
                var cliente = await clienteRepository.GetByNomeFantasiaOrRazaoSocial(contato.NomeCliente, Session);
                if (cliente != null)
                {
                    contato.IdCliente = cliente.Id;
                }
                else
                {
                    contatosClienteNotMatched.Add(contato);
                }
            }
            var contatosCliente = contatoClienteDTOs.MapTo<IList<ContatoCliente>>();

            return await contatoClienteRepository.BulkInsert(contatosCliente, Session);
        }

        public Task<IList<ContatoClienteDTO>> GetAllFiltered(string start, string end, string projetoId)
        {
            throw new System.NotImplementedException();
        }
    }
}