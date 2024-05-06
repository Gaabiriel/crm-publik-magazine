namespace Common.Entities
{
    public class Customer : BaseEntity
    {
        public string CodCliente { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeInsercaoSite { get; set; }
        public string Cnpj { get; set; }
        public string InscricaoEstadual { get; set; }
        public string TelefoneFixo { get; set; }
        public string Endereco { get; set; }
        public string Cep { get; set; }
        public string EmailFaturamento { get; set; }
        public string EmalAlertaOportunidade { get; set; }
        public string EmailCobranca { get; set; }
        public string Site { get; set; }
        public string EnderecoCobranca { get; set; }
        public string CepCobranca { get; set; }

        //Reponsavel financeiro
        public string NomeResponsavelFinanceiro { get; set; }
        public string EmailResponsavelFinanceiro { get; set; }
        public string CargoResponsavelFinanceiro { get; set; }
        public string TelefoneFixoRF { get; set; }
        public string CelularRF { get; set; }

        // Autorizante
        public string NomeAutorizante { get; set; }
        public string EmailAutorizante { get; set; }
        public string CargoAutorizante { get; set; }
        public string TelefoneFixoA { get; set; }
        public string CelularA { get; set; }

        // ContatoCliente de propaganda
        public string AgenciaPropaganda { get; set; }
        public string Tipo { get; set; }
        public string Representante { get; set; }

    }
}
