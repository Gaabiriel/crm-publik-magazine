using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    [Table("Projetos")]
    public class Projeto : BaseEntity
    {
        public string Nome { get; set; }

    }
}
