using CsvHelper.Configuration.Attributes;

namespace Common.DTO
{
    public class ClienteCsvDTO
    {
        [Index(0)]
        public string RazaoSocial { get; set; }
        [Index(1)]
        public string NomeFantasia { get; set; }
        [Index(2)]
        public string Cnpj { get; set; }
        [Index(3)]
        public string NomeContato { get; set; }
        [Index(4)]
        public string InscricaoSocial { get; set; }
        [Index(5)]
        public string Cnpj2 { get; set; }
        [Index(6)]
        public string Cargo { get; set; }
        [Index(7)]
        public string Celular1 { get; set; }
        [Index(8)]
        public string Celular2 { get; set; }
        [Index(9)]
        public string Email1 { get; set; }
        [Index(10)]
        public string Email2 { get; set; }
        [Index(11)]
        public string Telefone1 { get; set; }
        [Index(12)]
        public string Telefone2 { get; set; }
        [Index(13)]
        public string Endereco { get; set; }
        [Index(14)]
        public string Complemento { get; set; }
        [Index(15)]
        public string Bairro { get; set; }
        [Index(16)]
        public string Cidade { get; set; }
        [Index(17)]
        public string Cep { get; set; }
        [Index(18)]
        public string UF { get; set; }
        [Index(19)]
        public string Associado { get; set; }
        [Index(20)]
        public string GrPerfil { get; set; }
        [Index(21)]
        public string Perfil { get; set; }

        [Index(22)]
        public string CamaraSetorial { get; set; }

        [Index(23)]
        public string PerfilEmpresa { get; set; }
        //public int ProjetoId { get; set; }
        //[Index(22)]
        //public string ProjetoId { get; set; }

    }
}
