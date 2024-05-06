using System;

namespace Common.Entities
{
    public class ContatoCliente : BaseEntity
    {
        public string Nome { get; set; }
        public string Cargo { get; set; }
        public string Email { get; set; }
        public string TelefoneFixo { get; set; }
        public string Celular { get; set; }
        public DateTime? Aniversario { get; set; }
        public int IdCliente { get; set; }

    }
}
