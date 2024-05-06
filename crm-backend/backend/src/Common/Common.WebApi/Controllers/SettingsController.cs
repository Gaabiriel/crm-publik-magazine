using Common.DTO;
using Common.Services.Infrastructure;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [RoutePrefix("settings")]
    [Authorize]
    public class SettingsController : BaseApiController
    {
        protected readonly ISettingsService settingsService;
        public SettingsController(ISettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpGet]
        [Route("current")]
        public async Task<IHttpActionResult> GetCurrentSetting()
        {
            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                var result = await settingsService.GetById(currentUserId);
                return Ok(result);
            }

            return Unauthorized();
        }

        [HttpPut]
        [Route("current")]
        public async Task<IHttpActionResult> EditCurrentSetting(SettingsDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ThemeName))
            {
                return BadRequest();
            }

            int.TryParse(User.Identity.GetUserId(), out var currentUserId);
            if (currentUserId > 0)
            {
                dto.Id = currentUserId;
                var result = await settingsService.Edit(dto);
                return Ok(result);
            }

            return Unauthorized();
        }
    }
}