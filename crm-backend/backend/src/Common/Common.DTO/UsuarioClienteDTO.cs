namespace Common.DTO
{
    public class UsuarioClienteDTO
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public int IdCliente { get; set; }

        public virtual UserDTO Usuario { get; set; }
        public virtual ClienteDTO Cliente { get; set; }
    }
}
