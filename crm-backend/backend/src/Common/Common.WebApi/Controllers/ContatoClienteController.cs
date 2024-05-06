using Common.DTO;
using Common.Services.Infrastructure;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("contatoCliente")]
    [Authorize]

    public class ContatoClienteController : BaseApiController
    {
        protected readonly IContatoClienteService contatoClienteService;
        public ContatoClienteController(IContatoClienteService contatoClienteService)
        {
            this.contatoClienteService = contatoClienteService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAll()
        {
            var user = await contatoClienteService.GetAll();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var user = await contatoClienteService.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(ContatoClienteDTO contatoClienteDto)
        {
            if (contatoClienteDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await contatoClienteService.Edit(contatoClienteDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Edit(int id, ContatoClienteDTO contatoClienteDto)
        {
            if (id != contatoClienteDto.Id)
                return BadRequest();

            var result = await contatoClienteService.Edit(contatoClienteDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await contatoClienteService.Delete(id);
            return Ok(result);
        }
    }
}