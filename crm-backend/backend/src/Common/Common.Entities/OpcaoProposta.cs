using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    [Table("OpcaoProposta")]
    public class OpcaoProposta : BaseEntity
    {
        public string FormatoAnuncio { get; set; }
        public string Valor { get; set; }
        public string ValorEspecial { get; set; }
        public string Pagamento { get; set; }
        public string Localizacao { get; set; }
        public string Observacoes { get; set; }
        public int IdProposta { get; set; }

    }
}
