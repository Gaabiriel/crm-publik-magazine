using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    public class ReuniaoCliente : BaseEntity
    {
        public string Nome { get; set; }
        public DateTime? Comeco { get; set; }
        public DateTime? Fim { get; set; }
        public string Descricao { get; set; }
        public int? IdCliente { get; set; }
        [ForeignKey(nameof(IdCliente))]
        public virtual Cliente Cliente { get; set; }
        public int? IdUsuario { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        public virtual User Usuario { get; set; }
        public bool Notified { get; set; }
    }
}
