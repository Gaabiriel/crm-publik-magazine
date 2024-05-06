using Common.DTO;
using Common.Entities;
using Common.Services.Infrastructure;
using Common.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services
{
    public class PropostaService<TProposta> : BaseService, IPropostaService where TProposta : Propostas, new()
    {
        protected readonly IPropostaRepository<TProposta> propostaRepository;

        public PropostaService(ICurrentContextProvider contextProvider, IPropostaRepository<TProposta> propostaRepository) : base(contextProvider)
        {
            this.propostaRepository = propostaRepository;
        }

        public async Task<bool> Delete(int id)
        {
            await propostaRepository.Delete(id, Session);
            return true;
        }

        public async Task<PropostasDTO> Edit(PropostasDTO dto)
        {
            var proposta = dto.MapTo<TProposta>();
            await propostaRepository.Edit(proposta, Session);
            return proposta.MapTo<PropostasDTO>();
        }

        public async Task<IList<PropostasDTO>> GetAll(bool includeDeleted = false)
        {
            var proposta = await propostaRepository.GetAll(Session, includeDeleted);
            return proposta.MapTo<IList<PropostasDTO>>();
        }

        public async Task<PropostasDTO> GetById(int id, bool includeDeleted = false)
        {
            var proposta = await propostaRepository.GetById(id, Session, includeDeleted);
            return proposta.MapTo<PropostasDTO>();
        }

        public async Task<IList<RelatorioPropostaClienteDTO>> GetAllPropostaFiltered(string start, string end, int projetoId, string statusProposta)
        {
            var relatorioPropostas = await propostaRepository.GetAllPropostaFiltered(Session, start, end, projetoId, statusProposta);

            return relatorioPropostas.MapTo<IList<RelatorioPropostaClienteDTO>>();
        }
    }
}