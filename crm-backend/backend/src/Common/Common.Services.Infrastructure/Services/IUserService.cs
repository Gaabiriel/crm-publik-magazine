using Common.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IUserService
    {
        Task<UserDTO> GetById(int id, bool includeDeleted = false);
        Task<UserDTO> GetByLogin(string login, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO dto);
        Task<byte[]> GetUserPhoto(int userId);
        Task<IList<UserDTO>> GetAll(bool includeDeleted = false);
    }
}