using Common.WebApi;
using System.Web.Http;

namespace Common.WebApi
{
    public static class RouteConfig
    {
        public static void ConfigureRoutes(HttpConfiguration config)
        {
            var baseEndpoint = "api";

            config.MapHttpAttributeRoutes(new CentralizedPrefixProvider(baseEndpoint));

            config.Routes.MapHttpRoute(
                name: "Api",
                routeTemplate: $"{baseEndpoint}/{{controller}}/{{id}}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}