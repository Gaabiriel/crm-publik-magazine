using System.Collections.Generic;

namespace Common.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public int? Age { get; set; }
        public int RoleId { get; set; }
        public string TelefoneFixo { get; set; }
        public string Celular { get; set; }
        public string Regiao { get; set; }
        public RoleDTO Role { get; set; }
        public AddressDTO Address { get; set; } 
        public SettingsDTO Settings { get; set; }
    }
}
