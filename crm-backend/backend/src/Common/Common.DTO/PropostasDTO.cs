using System;

namespace Common.DTO
{
    public class PropostasDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Status { get; set; }
        public DateTime DataCriacao { get; set; }
        public int IdCliente { get; set; }
        public string Agencia { get; set; }
    }
}
