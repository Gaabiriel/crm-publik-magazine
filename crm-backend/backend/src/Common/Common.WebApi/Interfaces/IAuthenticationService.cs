using Common.DTO;
using Common.WebApi.Identity;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace Common.WebApi
{
    public interface IAuthenticationService
    {
        Task<AuthResult<Token>> Login(LoginDTO loginDto);
        Task<AuthResult<Token>> ChangePassword(ChangePasswordDTO changePasswordDto);
        Task<AuthResult<Token>> SignUp(SignUpDTO signUpDto);
        Task<AuthResult<string>> RequestPassword(RequestPasswordDTO requestPasswordDto);
        Task<AuthResult<Token>> RestorePassword(RestorePasswordDTO restorePasswordDto);
        Task<AuthResult<Token>> SignOut();
        Task<AuthResult<Token>> RefreshToken(RefreshTokenDTO refreshTokenDto);
        Task<Token> GenerateToken(int userId);
        Task<Entities.User> CreateUserAsync(UserDTO signUpDto);
    }
}