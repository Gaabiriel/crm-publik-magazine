using System.Web.Http;

namespace Common.WebApi.Controllers
{
    [Authorize]
    public abstract class BaseApiController : ApiController
    {
    }
}
