using Common.DTO;
using Common.Entities;
using Common.Services.Infrastructure;
using Common.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Services
{
    public class UserService<TUser> : BaseService, IUserService where TUser : User, new()
    {
        protected readonly IUserRepository<TUser> userRepository;
        protected readonly IUserPhotoRepository userPhotoRepository;

        public UserService(ICurrentContextProvider contextProvider, IUserRepository<TUser> userRepository,
            IUserPhotoRepository userPhotoRepository) : base(contextProvider)
        {
            this.userRepository = userRepository;
            this.userPhotoRepository = userPhotoRepository;
        }

        public async Task<bool> Delete(int id)
        {
            await userRepository.Delete(id, Session);
            return true;
        }

        public async Task<UserDTO> Edit(UserDTO dto)
        {
            var user = dto.MapTo<TUser>();
            await userRepository.Edit(user, Session);
            return user.MapTo<UserDTO>();
        }

        public async Task<byte[]> GetUserPhoto(int userId)
        {
            var photoContent = await userPhotoRepository.Get(userId, Session);
            return photoContent?.Image;
        }

        public async Task<UserDTO> GetById(int id, bool includeDeleted = false)
        {
            var user = await userRepository.Get(id, Session, includeDeleted);

            var userDto = user.MapTo<UserDTO>();

            var role = user.UserRoles?.FirstOrDefault();
            if (role != null)
            {
                userDto.Role = role.MapTo<RoleDTO>();
                userDto.RoleId = userDto.Role.Id;
            }

            return userDto;
        }

        public async Task<IList<UserDTO>> GetAll(bool includeDeleted = false)
        {
            var cliente = await userRepository.GetAll(Session, includeDeleted);
            return cliente.MapTo<IList<UserDTO>>();
        }
        public async Task<UserDTO> GetByLogin(string login, bool includeDeleted = false)
        {
            var user = await userRepository.GetByLogin(login, Session, includeDeleted);
            return user.MapTo<UserDTO>();
        }
    }
}