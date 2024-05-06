using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Common.WebApi
{
    public static class WebApiConfig
    {
        private static void SetGlobalJsonSettings(this HttpConfiguration config)
        {
            config.Formatters.Clear();

            var jsonFormatter = new JsonMediaTypeFormatter
            {
                SerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    Converters = new List<JsonConverter> { new StringEnumConverter(new CamelCaseNamingStrategy()) }
                }
            };

            config.Formatters.Add(jsonFormatter);
        }

        public static void Configure(HttpConfiguration config)
        {
            config.SetGlobalJsonSettings();
        }
    }
}
