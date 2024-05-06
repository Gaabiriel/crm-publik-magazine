using Common.DTO;
using Common.Entities;
using Common.Services.Infrastructure;
using Common.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services
{
    public class ProjetoService<TProjeto> : BaseService, IProjetoService where TProjeto : Projeto, new()
    {
        protected readonly IProjetoRepository<TProjeto> projetoRepository;

        public ProjetoService(ICurrentContextProvider contextProvider, IProjetoRepository<TProjeto> projetoRepository) : base(contextProvider)
        {
            this.projetoRepository = projetoRepository;
        }

        public async Task<bool> Delete(int id)
        {
            await projetoRepository.Delete(id, Session);
            return true;
        }

        public async Task<ProjetoDTO> Update(ProjetoDTO dto)
        {
            var projeto = dto.MapTo<TProjeto>();
            await projetoRepository.Update(projeto, Session);
            return projeto.MapTo<ProjetoDTO>();
        }

        public async Task<IList<ProjetoDTO>> GetAll(bool includeDeleted = false)
        {
            var projeto = await projetoRepository.GetAll(Session, includeDeleted);
            return projeto.MapTo<IList<ProjetoDTO>>();
        }

        public async Task<ProjetoDTO> GetById(int id, bool includeDeleted = false)
        {
            var projeto = await projetoRepository.GetById(id, Session, includeDeleted);
            return projeto.MapTo<ProjetoDTO>();
        }


    }
}