using Common.WebApi.Filters;
using System.Web.Http.Filters;

namespace Common.WebApi
{
    public static class FilterConfig
    {
        public static void RegisterFilters(HttpFilterCollection filters)
        {
            filters.Add(new WebApiExceptionFilterAttribute());
        }
    }
}