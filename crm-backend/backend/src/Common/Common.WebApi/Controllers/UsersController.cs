using Common.DTO;
using Common.Services.Infrastructure;
using Common.WebApi.Identity;
using Microsoft.AspNet.Identity;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Common.Entities;
using System.Linq;
using System.Web;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("users")] 

    public class UsersController : BaseApiController
    {
        protected readonly IUserService userService;
        protected readonly IAuthenticationService authService;
        protected readonly IRoleService roleService;
        protected readonly IPerfilService perfilService;
        public UsersController(IUserService userService, IAuthenticationService authService, IRoleService roleService, IPerfilService perfilService)
        {
            this.userService = userService;
            this.authService = authService;
            this.roleService = roleService;
            this.perfilService = perfilService;
        }

        [HttpGet]
        [Route("")]
        [AllowAnonymous]

        public async Task<IHttpActionResult> GetAll()
        {
            var user = await userService.GetAll();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:int}")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Get(int id)
        {
            var user = await userService.GetById(id);
            return Ok(user);
        }

        [HttpGet]
        [Route("current")]
        [OverrideAuthorization]
        [Authorize]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetCurrent()
        {
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var user = await userService.GetById(currentUserId);
                return Ok(user);
            }

            return Unauthorized();
        }

        [HttpPut]
        [Route("current")]
        [OverrideAuthorization]
        [AllowAnonymous] 
        public async Task<IHttpActionResult> EditCurrent(UserDTO userDto)
        {
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId != userDto.Id)
            {
                return BadRequest();
            }

            if (userDto.RoleId > 0)
            {
                var userRoles = await roleService.GetRoles(userDto.Id);

                var allRoles = await perfilService.GetAll();
                var userRole = allRoles.Where(x => userRoles.Contains(x.Name))?.FirstOrDefault();
                var newRole = allRoles.Where(x => x.Id.Equals(userDto.RoleId))?.FirstOrDefault();


                await roleService.UnassignRole(userDto.Id, userRole.Name);
                await roleService.AssignToRole(userDto.Id, newRole.Name);
            }
            await userService.Edit(userDto);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Roles.Admin)] 
        public async Task<IHttpActionResult> Create(UserDTO userDto)
        {
            if (userDto.Id != 0)
            {
                return BadRequest();
            }

            var signUpResult = await authService.CreateUserAsync(userDto);


            if (signUpResult.Id > 0)
            {
                //var result = await userService.Edit(userDto);

                if (userDto.RoleId > 0)
                {
                    var allRoles = await perfilService.GetAll();
                    var userRole = allRoles.Where(x => x.Id.Equals(userDto.RoleId))?.FirstOrDefault();

                    await roleService.AssignToRole(signUpResult.Id, userRole.Name);
                }

                return Ok(signUpResult);

            }
            return BadRequest();
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = Roles.Admin)] 
        public async Task<IHttpActionResult> Edit(int id, UserDTO userDto)
        {
            if (id != userDto.Id)
                return BadRequest();

            if (userDto.RoleId > 0)
            {
                var userRoles = await roleService.GetRoles(userDto.Id);

                var allRoles = await perfilService.GetAll();
                var userRole = allRoles.Where(x => userRoles.Contains(x.Name))?.FirstOrDefault();
                var newRole = allRoles.Where(x => x.Id.Equals(userDto.RoleId))?.FirstOrDefault();


                await roleService.UnassignRole(userDto.Id, userRole.Name);
                await roleService.AssignToRole(userDto.Id, newRole.Name);
            }

            var result = await userService.Edit(userDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await userService.Delete(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("{userId:int}/photo")]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> UserPhoto(int userId, string token)
        {
            var user = JwtManager.GetPrincipal(token);
            if (user == null || !user.Identity.IsAuthenticated)
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            var photoContent = await userService.GetUserPhoto(userId);

            if (photoContent == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }

            using (var ms = new MemoryStream(photoContent))
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(ms.ToArray())
                };

                response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

                return response;
            }
        }
    }
}