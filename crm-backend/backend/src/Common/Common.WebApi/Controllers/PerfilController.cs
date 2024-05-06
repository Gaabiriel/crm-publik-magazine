using Common.DTO;
using Common.Services.Infrastructure;
using System.Threading.Tasks;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("perfil")]
    [Authorize] 
    public class PerfilController : BaseApiController
    {
        protected readonly IPerfilService perfilService;
        public PerfilController(IPerfilService perfilService)
        {
            this.perfilService = perfilService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAll()
        {
            var user = await perfilService.GetAll();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var user = await perfilService.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(RoleDTO perfilsDto)
        {
            if (perfilsDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await perfilService.Edit(perfilsDto);
            return Ok(result);
        }

    }
}