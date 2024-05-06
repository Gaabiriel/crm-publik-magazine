using System;

namespace Common.DTO
{
    public class ReuniaoClienteDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime? Comeco { get; set; }
        public DateTime? Fim { get; set; }
        public string Descricao { get; set; }
        public int IdCliente { get; set; }
        public ClienteDTO Cliente { get; set; }
        public int IdUsuario { get; set; }
        public UserDTO Usuario { get; set; }
        public bool Notified { get; set; }
    }
}
