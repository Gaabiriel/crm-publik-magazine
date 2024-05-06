using Common.Entities;
using Microsoft.AspNet.Identity;

namespace Common.WebApi
{
    public class ApplicationRole : Role, IRole<int>
    {
    }
}
