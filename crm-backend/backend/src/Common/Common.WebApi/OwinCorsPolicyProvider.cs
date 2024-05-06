using Microsoft.Owin;
using Microsoft.Owin.Cors;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Cors;

namespace Common.WebApi
{
    public class OwinCorsPolicyProvider : ICorsPolicyProvider
    {
        private readonly CorsPolicy _policy;

        public OwinCorsPolicyProvider()
        {
            var settings = ConfigurationManager.AppSettings;

            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true
            };

            if (!string.IsNullOrEmpty(settings["origin"]))
            {
                _policy.Origins.Add(settings["origin"]);
            }
            else
            {
                _policy.AllowAnyOrigin = true;
            }
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(IOwinRequest request)
        {
            return Task.FromResult(_policy);
        }
    }
}
