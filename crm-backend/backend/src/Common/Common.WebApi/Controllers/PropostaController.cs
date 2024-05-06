using Common.DTO;
using Common.Services.Infrastructure;
using Common.Utils.Services;
using ExcelDataReader;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("proposta")]
    [Authorize] 
    public class PropostaController : BaseApiController
    {
        protected readonly IPropostaService propostaService;
        public PropostaController(IPropostaService propostaService)
        {
            this.propostaService = propostaService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAll()
        {
            var user = await propostaService.GetAll();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var user = await propostaService.GetById(id);
            return Ok(user);
        }


        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(PropostasDTO propostasDto)
        {
            if (propostasDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await propostaService.Edit(propostasDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Edit(int id, PropostasDTO propostasDto)
        {
            if (id != propostasDto.Id)
                return BadRequest();

            var result = await propostaService.Edit(propostasDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await propostaService.Delete(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllPropostaFiltered/{projetoId}/{statusProposta}")]
        public async Task<IHttpActionResult> GetAllPropostaFiltered(
           int projetoId,
           [Microsoft.AspNetCore.Mvc.FromQuery(Name = "start")] DateTime? start = null,
           [Microsoft.AspNetCore.Mvc.FromQuery(Name = "end")] DateTime? end = null,
           string statusProposta = null)
        {
            var relatorioPropostaClienteDTOs = await propostaService.GetAllPropostaFiltered(start.ToString(), end.ToString(), projetoId, statusProposta);
            return Ok(relatorioPropostaClienteDTOs);
        }

    }
}