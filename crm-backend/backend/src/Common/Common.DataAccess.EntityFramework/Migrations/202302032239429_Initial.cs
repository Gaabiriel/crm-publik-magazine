namespace Common.DataAccess.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "starter.Cliente",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NomeFantasia = c.String(),
                        RazaoSocial = c.String(),
                        Cnpj = c.String(),
                        InscricaoEstadual = c.String(),
                        TelefoneFixo = c.String(),
                        Endereco = c.String(),
                        Cep = c.String(),
                        Email = c.String(),
                        Site = c.String(),
                        DataFundacao = c.DateTime(),
                        InscricaoSocial = c.String(),
                        Complemento = c.String(),
                        Cidade = c.String(),
                        UF = c.String(),
                        Associado = c.String(),
                        Atualizado = c.String(),
                        DataAtualizacao = c.DateTime(),
                        Aprovado = c.Boolean(nullable: false),
                        PerfilEmpresa = c.String(),
                        Contactada = c.Boolean(nullable: false),
                        ProjetoId = c.Int(nullable: false),
                        UsuarioId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Projetos", t => t.ProjetoId, cascadeDelete: true)
                .ForeignKey("starter.Users", t => t.UsuarioId, cascadeDelete: true)
                .Index(t => t.ProjetoId)
                .Index(t => t.UsuarioId);
            
            CreateTable(
                "starter.ContatoClientes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Cargo = c.String(),
                        Email = c.String(),
                        TelefoneFixo = c.String(),
                        Celular = c.String(),
                        Aniversario = c.DateTime(),
                        IdCliente = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Cliente", t => t.IdCliente, cascadeDelete: true)
                .Index(t => t.IdCliente);
            
            CreateTable(
                "starter.Projetos",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "starter.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Login = c.String(),
                        Password = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(nullable: false),
                        Age = c.Int(),
                        Street = c.String(),
                        City = c.String(),
                        ZipCode = c.String(),
                        Lat = c.Double(),
                        Lng = c.Double(),
                        TelefoneFixo = c.String(),
                        Celular = c.String(),
                        Regiao = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "starter.UserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ClaimType = c.String(nullable: false),
                        ClaimValue = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "starter.UserPhotos",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Image = c.Binary(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Users", t => t.Id, cascadeDelete: true)
                .Index(t => t.Id);
            
            CreateTable(
                "starter.Settings",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        ThemeName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Users", t => t.Id, cascadeDelete: true)
                .Index(t => t.Id);
            
            CreateTable(
                "starter.UserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("starter.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("starter.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "starter.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "starter.OpcaoProposta",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FormatoAnuncio = c.String(),
                        Valor = c.String(),
                        ValorEspecial = c.String(),
                        Pagamento = c.String(),
                        Localizacao = c.String(),
                        Observacoes = c.String(),
                        IdProposta = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "starter.Propostas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Descricao = c.String(),
                        Status = c.String(),
                        IdCliente = c.Int(nullable: false),
                        Agencia = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Cliente", t => t.IdCliente, cascadeDelete: true)
                .Index(t => t.IdCliente);
            
            CreateTable(
                "starter.RelatorioClienteFields",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PropertyName = c.String(),
                        PropertyDescription = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "starter.ReuniaoClientes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Comeco = c.DateTime(),
                        Fim = c.DateTime(),
                        Descricao = c.String(),
                        IdCliente = c.Int(),
                        IdUsuario = c.Int(),
                        Notified = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("starter.Cliente", t => t.IdCliente)
                .ForeignKey("starter.Users", t => t.IdUsuario)
                .Index(t => t.IdCliente)
                .Index(t => t.IdUsuario);
            
        }
        
        public override void Down()
        {
            DropForeignKey("starter.ReuniaoClientes", "IdUsuario", "starter.Users");
            DropForeignKey("starter.ReuniaoClientes", "IdCliente", "starter.Cliente");
            DropForeignKey("starter.Propostas", "IdCliente", "starter.Cliente");
            DropForeignKey("starter.Cliente", "UsuarioId", "starter.Users");
            DropForeignKey("starter.UserRoles", "UserId", "starter.Users");
            DropForeignKey("starter.UserRoles", "RoleId", "starter.Roles");
            DropForeignKey("starter.Settings", "Id", "starter.Users");
            DropForeignKey("starter.UserPhotos", "Id", "starter.Users");
            DropForeignKey("starter.UserClaims", "UserId", "starter.Users");
            DropForeignKey("starter.Cliente", "ProjetoId", "starter.Projetos");
            DropForeignKey("starter.ContatoClientes", "IdCliente", "starter.Cliente");
            DropIndex("starter.ReuniaoClientes", new[] { "IdUsuario" });
            DropIndex("starter.ReuniaoClientes", new[] { "IdCliente" });
            DropIndex("starter.Propostas", new[] { "IdCliente" });
            DropIndex("starter.UserRoles", new[] { "RoleId" });
            DropIndex("starter.UserRoles", new[] { "UserId" });
            DropIndex("starter.Settings", new[] { "Id" });
            DropIndex("starter.UserPhotos", new[] { "Id" });
            DropIndex("starter.UserClaims", new[] { "UserId" });
            DropIndex("starter.ContatoClientes", new[] { "IdCliente" });
            DropIndex("starter.Cliente", new[] { "UsuarioId" });
            DropIndex("starter.Cliente", new[] { "ProjetoId" });
            DropTable("starter.ReuniaoClientes");
            DropTable("starter.RelatorioClienteFields");
            DropTable("starter.Propostas");
            DropTable("starter.OpcaoProposta");
            DropTable("starter.Roles");
            DropTable("starter.UserRoles");
            DropTable("starter.Settings");
            DropTable("starter.UserPhotos");
            DropTable("starter.UserClaims");
            DropTable("starter.Users");
            DropTable("starter.Projetos");
            DropTable("starter.ContatoClientes");
            DropTable("starter.Cliente");
        }
    }
}
