using Common.Entities;
using Microsoft.AspNet.Identity;

namespace Common.WebApi
{
    public class ApplicationUser : User, IUser<int>
    {
        public string UserName
        {
            get => Login;
            set => Login = value;
        }
    }
}
