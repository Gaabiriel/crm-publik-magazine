using AutoMapper;
using Common.Entities;

namespace Common.WebApi
{
    public class IdentityUserProfile : Profile
    {
        public IdentityUserProfile()
        {
            CreateMap<ApplicationUser, User>().ReverseMap();
            CreateMap<ApplicationRole, Role>().ReverseMap();
            CreateMap<ApplicationUserRole, UserRole>().ReverseMap();
            CreateMap<ApplicationUserClaim, UserClaim>().ReverseMap();
        }
    }
}