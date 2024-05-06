using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class ReuniaoClienteConfig : BaseEntityConfig<ReuniaoCliente>
    {
        public ReuniaoClienteConfig() : base("ReuniaoCliente")
        {
            HasRequired(c => c.Usuario)
                .WithMany()
                .WillCascadeOnDelete(false);

            HasRequired(c => c.Cliente)
                .WithMany()
                .WillCascadeOnDelete(false);
        }
    }
}
