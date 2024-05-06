using CsvHelper.Configuration.Attributes;
using System;

namespace Common.DTO
{
    public class ClienteDTO
    {
        public int Id { get; set; }
        [Index(0)]
        public string RazaoSocial { get; set; }
        [Index(1)]
        public string NomeFantasia { get; set; }
        [Index(3)]
        public string Cnpj { get; set; }
        [Index(4)]
        public string NomeContato { get; set; }
        public string InscricaoSocial { get; set; }
        public string InscricaoEstadual { get; set; }
        public string TelefoneFixo { get; set; }
        public string Endereco { get; set; }
        public string Cep { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public DateTime? DataFundacao { get; set; }
        public string Cargo { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Telefone1 { get; set; }
        public string Telefone2 { get; set; }
        public string Complemento { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public string Associado { get; set; }
        public string Atualizado { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public bool Aprovado { get; set; }
        public string CamaraSetorial { get; set; }
        public string PerfilEmpresa { get; set; }
        public bool Contactada { get; set; }
        public int ProjetoId { get; set; }
        public ProjetoDTO Projeto { get; set; }
        public int UsuarioId { get; set; }
        public UserDTO Usuario { get; set; }


    }
}
