using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class ProjetoConfig : BaseEntityConfig<Projeto>
    {
        public ProjetoConfig() : base("Projeto")
        {
            Property(obj => obj.Id).HasColumnName("Id").IsRequired();
            Property(obj => obj.Nome).HasColumnName("Nome").IsRequired(); 
        }
    }
}
