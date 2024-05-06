using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Common.Entities.Enums
{
    public enum ClienteRelatorioFields
    {
        [Description("Nome Fantasia")]
        NomeFantasia,
        [Description("Razao Social")]
        RazaoSocial,
        [Description("Cnpj")]
        Cnpj,
        [Description("Inscrição Estadual")]
        InscricaoEstadual,
        [Description("Telefone Fixo")]
        TelefoneFixo,
        [Description("Endereco")]
        Endereco,
        [Description("Cep")]
        Cep,
        [Description("Email")]
        Email,
        [Description("Site")]
        Site,
        [Description("Data Fundação")]
        DataFundacao,
        [Description("Inscrição Social")]
        InscricaoSocial,
        [Description("Complemento")]
        Complemento,
        [Description("Cidade")]
        Cidade,
        [Description("UF")]
        UF,
        [Description("Associado")]
        Associado,
        [Description("Atualizado")]
        Atualizado,
        [Description("Data Atualização")]
        DataAtualizacao,
        [Description("Projeto")]
        ProjetoId,
        [Description("Usuário")]
        UsuarioId,
        [Description("Aprovado")]
        Aprovado,
        [Description("Perfil Empresa")]
        PerfilEmpresa,
    }
}
