using Common.Entities;
using Common.Services.Infrastructure;
using Microsoft.AspNet.Identity;
using System.Web;

namespace Common.WebApi
{
    public class CurrentContextProvider : ICurrentContextProvider
    {
        public ContextSession GetCurrentContext()
        {
            var currentUserId = HttpContext.Current.User.Identity.GetUserId<int>();
            return new ContextSession { UserId = currentUserId };
        }
    }
}
