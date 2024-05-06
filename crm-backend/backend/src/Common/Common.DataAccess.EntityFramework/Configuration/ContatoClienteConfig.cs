using Common.Entities;

namespace Common.DataAccess.EntityFramework.Configuration.System
{
    public class ContatoClienteConfig : BaseEntityConfig<ContatoCliente>
    {
        public ContatoClienteConfig() : base("ContatoCliente")
        {
            Property(obj => obj.Nome).HasColumnName("Nome").IsOptional();
            Property(obj => obj.Email).HasColumnName("Email").IsOptional();
            Property(obj => obj.TelefoneFixo).HasColumnName("TelefoneFixo").IsOptional();
            Property(obj => obj.Celular).HasColumnName("Celular").IsOptional();
            Property(obj => obj.Aniversario).HasColumnName("Aniversario").IsOptional();

            //HasMany(r => r.UserRoles).WithRequired().HasForeignKey(ur => ur.RoleId);

        }
    }
}
