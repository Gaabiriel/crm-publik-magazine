using Common.DTO;
using Common.Services.Infrastructure;
using Common.Utils.Services;
using Common.Utils.Wrappers;
using Common.WebApi.Identity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("cliente")]
    [Authorize] 
    public class ClienteController : BaseApiController
    {
        protected readonly IClienteService clienteService;
        protected readonly IContatoClienteService contatoClienteService;
        protected readonly ICsvService csvService;
        protected readonly IRoleService roleService;

        public ClienteController(IClienteService clienteService, ICsvService csvService, IContatoClienteService contatoClienteService, IRoleService roleService)
        {
            this.clienteService = clienteService;
            this.csvService = csvService;
            this.contatoClienteService = contatoClienteService;
            this.roleService = roleService;
        }


        [HttpGet]
        [Route("GetAllForAutocomplete/{onlyAprovado}")]
        public async Task<IHttpActionResult> GetAllForAutocomplete(bool onlyAprovado = false)
        {
            var clienteAutocomlete = new List<ClienteAutoCompleteDTO>();
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);

            if (currentUserId > 0)
            {
                clienteAutocomlete = (List<ClienteAutoCompleteDTO>)await clienteService.GetAllForAutocomplete(onlyAprovado, currentUserId);
            }
            else
            {
                clienteAutocomlete = (List<ClienteAutoCompleteDTO>)await clienteService.GetAllForAutocomplete(onlyAprovado, 0);
            }

            return Ok(clienteAutocomlete);
        }


        [HttpGet]
        [Route("GetAllPaged")]
        public async Task<IHttpActionResult> GetAllPaged(bool onlyAprovado,
            int pageNumber,
            int pageSize,
            string projeto = null,
            string usuario = null,
            string nomeFantasia = null,
            string razaoSocial = null,
            string telefoneFixo = null,
            string email = null,
            string atualizado = null)
        {
            var clientes = new List<ClienteDTO>();
            var clientesCount = new long();

            int.TryParse(User.Identity.GetUserId(), out var currentUserId);

            if (currentUserId > 0)
            {
                var userRoles = await roleService.GetRoles(currentUserId);
                if (userRoles.Contains(Roles.Admin))
                {
                    clientes = (List<ClienteDTO>)await clienteService.GetAllPaged(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, 0);
                    clientesCount = await clienteService.GetAllPagedCount(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, 0);

                }
                else
                {
                    clientes = (List<ClienteDTO>)await clienteService.GetAllPaged(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, currentUserId);
                    clientesCount = await clienteService.GetAllPagedCount(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, currentUserId);

                }
            }
            else
            {
                clientes = (List<ClienteDTO>)await clienteService.GetAllPaged(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, 0);
                clientesCount = await clienteService.GetAllPagedCount(onlyAprovado, pageNumber, pageSize, projeto, usuario, nomeFantasia, razaoSocial, telefoneFixo, email, atualizado, 0);
            }

            return Ok(new PagedResponse<IList<ClienteDTO>>(clientes, pageNumber, pageSize, (int)clientesCount));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var cliente = await clienteService.GetById(id);
            return Ok(cliente);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(ClienteDTO clientesDto)
        {
            if (clientesDto.Id != 0)
            {
                return BadRequest();
            }

            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var userRoles = await roleService.GetRoles(currentUserId);
                if (userRoles.Contains(Roles.Admin))
                {
                    clientesDto.Aprovado = true;
                }
            }

            var result = await clienteService.Edit(clientesDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Edit(int id, ClienteDTO clientesDto)
        {
            if (id != clientesDto.Id)
                return BadRequest();

            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var userRoles = await roleService.GetRoles(currentUserId);
                if (userRoles.Contains(Roles.Admin))
                {
                    clientesDto.Aprovado = true;
                }
            }

            clientesDto.Atualizado = clientesDto.Atualizado;
            clientesDto.DataAtualizacao = DateTime.Now;
            var result = await clienteService.Edit(clientesDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await clienteService.Delete(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProjetos")]
        public async Task<IHttpActionResult> GetProjetos()
        {
            var projetos = await clienteService.GetProjetos();
            return Ok(projetos);
        }

        [HttpPost]
        [Route("ImportarClientesAsync/{projetoId:int}/{isAdmin}")]
        public async Task<IHttpActionResult> ImportarClientesAsync(int projetoId, bool isAdmin)
        {
            string message = "";
            var httpRequest = HttpContext.Current.Request;

            if (httpRequest.Files.Count > 0)
            {
                try
                {
                    var clientes = new List<ClienteDTO>();
                    var contatos = new List<ContatoClienteDTO>();

                    MapExcelDataToDto(isAdmin, httpRequest, clientes, contatos);

                    var clientesDistinct = clientes.GroupBy(x => x.NomeFantasia).Select(x => x.First()).ToList();

                    if (await clienteService.BulkInsert(clientesDistinct, projetoId))
                    {
                        message = $"{clientesDistinct.Count} clientes importados com sucesso.";

                        if (await contatoClienteService.BulkInsert(contatos))
                        {
                            message = $"{clientesDistinct.Count} clientes e {contatos.Count} contatos importados com sucesso.";
                            return Content(HttpStatusCode.OK, message);
                        }
                        else
                        {
                            message = "Erro ao importar clientes e contatos, favor contactar o administrador;";
                            return BadRequest(message);
                        }
                    }
                    else
                    {
                        message = "Erro ao importar clientes, favor contactar o administrador;";
                        return BadRequest(message);
                    }
                }
                catch (Exception ex)
                {
                    message = "Erro ao importar clientes, favor contactar o administrador;";
                    return BadRequest(message);
                }
            }
            else
            {
                message = "Erro ao importar clientes, arquivo não encontrado.";
                return BadRequest(message);
            }
        }

        private void MapExcelDataToDto(bool isAdmin, HttpRequest httpRequest, List<ClienteDTO> clientes, List<ContatoClienteDTO> contatos)
        {
            var conString = GetConnFromFile(httpRequest);

            using (var excel_con = new OleDbConnection(conString))
            {
                excel_con.Open();
                var sheet = excel_con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null).Rows[0]["TABLE_NAME"].ToString();

                var ocmd = new OleDbCommand("SELECT * FROM [" + sheet + "]", excel_con);
                var odr = ocmd.ExecuteReader();

                while (odr.Read())
                {
                    var cliente = new ClienteDTO();
                    int.TryParse(User.Identity.GetUserId(), out var currentUserId);
                    if (currentUserId > 0)
                    {
                        cliente.UsuarioId = currentUserId;
                    }
                    cliente.Aprovado = isAdmin;
                    //cliente.CamaraSetorial = valid(odr, 0).Trim();
                    cliente.RazaoSocial = valid(odr, 1).Trim();
                    cliente.NomeFantasia = valid(odr, 2).Trim();

                    if (string.IsNullOrEmpty(cliente.RazaoSocial) || string.IsNullOrEmpty(cliente.NomeFantasia))
                    {
                        continue;
                    }

                    cliente.Associado = valid(odr, 7).Trim();
                    cliente.PerfilEmpresa = valid(odr, 8).Trim();
                    clientes.Add(cliente);

                    var contato = new ContatoClienteDTO();
                    contato.Nome = valid(odr, 3).Trim();  
                    contato.Cargo = valid(odr, 4).Trim();
                    contato.TelefoneFixo = valid(odr, 5).Trim();
                    contato.Email = valid(odr, 6).Trim();
                    contato.NomeCliente = cliente.NomeFantasia.Trim();
                    contatos.Add(contato);
                }

                excel_con.Close();
            }
        }

        private static string GetConnFromFile(HttpRequest httpRequest)
        {
            var file = httpRequest.Files[0];
            var excelPath = HttpContext.Current.Server.MapPath("~/" + Path.GetFileName(file.FileName));
            file.SaveAs(excelPath);

            var conString = string.Empty;
            var extension = Path.GetExtension(file.FileName);
            switch (extension)
            {
                case ".xls": //Excel 97-03
                    conString = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                    break;
                case ".xlsx": //Excel 07 or higher
                    conString = ConfigurationManager.ConnectionStrings["Excel07+ConString"].ConnectionString;
                    break;

            }
            conString = string.Format(conString, excelPath);
            return conString;
        }

        [HttpPost]
        [Route("AprovarCliente/{id:int}")]
        public async Task<IHttpActionResult> AprovarCliente(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            await clienteService.AprovarCliente(id);
            return Ok();
        }

        [HttpPost]
        [Route("FlagClienteContactada/{id:int}")]
        public async Task<IHttpActionResult> FlagClienteContactada(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            await clienteService.FlagClienteContactada(id);
            return Ok();
        }

        [HttpPost]
        [Route("NotificarReuniao/{id:int}")]
        public async Task<IHttpActionResult> NotificarReuniao(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            await clienteService.NotificarReuniao(id);
            return Ok();
        }

        [HttpPost]
        [Route("CreateReuniao")]
        public async Task<IHttpActionResult> CreateReuniao(ReuniaoClienteDTO reuniaoClientesDto)
        {
            if (reuniaoClientesDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await clienteService.EditReuniao(reuniaoClientesDto);
            return Ok(result);

        }

        [HttpPut]
        [Route("EditReuniao/{id:int}")]
        public async Task<IHttpActionResult> EditReuniao(int id, ReuniaoClienteDTO reuniaoClientesDto)
        {
            if (id != reuniaoClientesDto.Id)
                return BadRequest();

            var result = await clienteService.EditReuniao(reuniaoClientesDto);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllReuniaoCliente")]
        public async Task<IHttpActionResult> GetAllReuniaoCliente()
        {
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var reuniaoClientes = await clienteService.GetAllReuniaoCliente(currentUserId);
                return Ok(reuniaoClientes);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetAllReuniaoFiltered/{projetoId}")]
        public async Task<IHttpActionResult> GetAllReuniaoFiltered(
            int projetoId,
            [Microsoft.AspNetCore.Mvc.FromQuery(Name = "start")] DateTime? start = null,
            [Microsoft.AspNetCore.Mvc.FromQuery(Name = "end")] DateTime? end = null)
        {
            var relatorioReuniaoClienteDTOs = await clienteService.GetAllReuniaoFiltered(start.ToString(), end.ToString(), projetoId);
            return Ok(relatorioReuniaoClienteDTOs);
        }

        [HttpGet]
        [Route("GetAllReuniaoByUsuarioId/{usuarioId}/{perfilEmpresa}")]
        public async Task<IHttpActionResult> GetAllReuniaoByUsuarioId(
            int usuarioId,
            [Microsoft.AspNetCore.Mvc.FromQuery(Name = "start")] DateTime? start = null,
            [Microsoft.AspNetCore.Mvc.FromQuery(Name = "end")] DateTime? end = null,
            string perfilEmpresa = null)
        {
            var relatorioReuniaoClienteDTOs = await clienteService.GetAllReuniaoByUsuarioId(start.ToString(), end.ToString(), usuarioId, perfilEmpresa);
            return Ok(relatorioReuniaoClienteDTOs);
        }

        [HttpGet]
        [Route("GetAllDailyReuniaoCliente")]
        public async Task<IHttpActionResult> GetAllDailyReuniaoCliente()
        {
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var reuniaoClientes = await clienteService.GetAllDailyReuniaoCliente(currentUserId);
                return Ok(reuniaoClientes);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetRelatorioClienteFields")]
        public async Task<IHttpActionResult> GetRelatorioClienteFields()
        {
            var clientesRelatoriosFields = await clienteService.GetRelatorioClienteFieldsAsync();
            return Ok(clientesRelatoriosFields);
        }

        protected string valid(OleDbDataReader myreader, int stval)//if any columns are found null then they are replaced by zero
        {
            object val = myreader[stval];
            if (val != DBNull.Value)
                return val.ToString();
            else
                return "";
        }
    }
}