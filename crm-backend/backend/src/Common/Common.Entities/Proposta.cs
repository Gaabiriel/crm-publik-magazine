using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    [Table("Propostas")]
    public class Propostas : BaseEntity
    {
        public string Descricao { get; set; }
        public string Status { get; set; }
        public DateTime DataCriacao { get { return DateTime.Now.ToUniversalTime(); } }
        public int IdCliente { get; set; }
        [ForeignKey(nameof(IdCliente))]
        public Cliente Cliente { get; set; }
        public string Agencia { get; set; }

    }
}
