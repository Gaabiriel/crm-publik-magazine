using Swashbuckle.Application;
using System.Web.Http;

namespace Common.WebApi
{
    public static class SwaggerConfig
    {
        public static void Configure(HttpConfiguration config)
        {
            config.EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "Web Api");
                    c.ApiKey("Token")
                        .Description("JWT token here")
                        .Name("Authorization")
                        .In("header");
                })
                .EnableSwaggerUi(c =>
                { 
                    c.EnableApiKeySupport("Authorization", "header");
                });
        }
    }
}