using Common.DTO;
using Common.Services.Infrastructure;
using System.Threading.Tasks;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("projeto")]
    [Authorize] 
    public class ProjetoController : BaseApiController
    {
        protected readonly IProjetoService projetoService;
        public ProjetoController(IProjetoService projetoService)
        {
            this.projetoService = projetoService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAll()
        {
            var user = await projetoService.GetAll();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var user = await projetoService.GetById(id);
            return Ok(user);
        }


        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(ProjetoDTO projetosDto)
        {
            if (projetosDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await projetoService.Update(projetosDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Update(int id, ProjetoDTO projetosDto)
        {
            if (id != projetosDto.Id)
                return BadRequest();

            var result = await projetoService.Update(projetosDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await projetoService.Delete(id);
            return Ok(result);
        }

    }
}