using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class ClienteConfig : BaseEntityConfig<Cliente>
    {
        public ClienteConfig() : base("Cliente")
        {   
            HasMany(obj => obj.ContatoClientes).WithRequired().HasForeignKey(obj => obj.IdCliente);

        }
    }
}
