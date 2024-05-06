using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    public class Cliente : BaseEntity
    {
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string Cnpj { get; set; }
        public string InscricaoEstadual { get; set; }
        public string TelefoneFixo { get; set; }
        public string Endereco { get; set; }
        public string Cep { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public DateTime? DataFundacao { get; set; }
        public string InscricaoSocial { get; set; }
        public string Complemento { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public string Associado { get; set; }
        public string Atualizado { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public bool Aprovado { get; set; }
        public string PerfilEmpresa { get; set; }
        public bool Contactada { get; set; }
        public virtual ICollection<ContatoCliente> ContatoClientes { get; set; }
        public int ProjetoId { get; set; }
        public virtual Projeto Projeto { get; set; } 
        public int UsuarioId { get; set; }
        public virtual User Usuario { get; set; }
    }
}
