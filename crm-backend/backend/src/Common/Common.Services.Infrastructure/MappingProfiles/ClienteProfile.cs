using AutoMapper;
using Common.DTO;
using Common.Entities;
using System;
using System.Collections.Generic;

namespace Common.Services.Infrastructure.MappingProfiles
{
    public class ClienteProfile : Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDTO>()
                 .ForMember(d => d.Cnpj, opt => opt.MapFrom(src => src.Cnpj))
               .ReverseMap();

            CreateMap<ClienteDTO, Cliente>()
                 .ForMember(d => d.Cnpj, opt => opt.MapFrom(src => src.Cnpj))
                            .ReverseMap();

            CreateMap<ClienteCsvDTO, Cliente>()
                 .ForMember(d => d.Cnpj, opt => opt.MapFrom(src => src.Cnpj))
                            .ReverseMap();

            CreateMap<ReuniaoCliente, RelatorioReuniaoClienteDTO>()
                .ForMember(d => d.Usuario, opt => opt.MapFrom(src => src.Usuario.FirstName))
                .ForMember(d => d.Cliente, opt => opt.MapFrom(src => src.Cliente.NomeFantasia))
                .ForMember(d => d.Comeco, opt => opt.MapFrom(src => src.Comeco.Value.ToString("dd/MM/yyyy hh:mm")))
                .ForMember(d => d.Fim, opt => opt.MapFrom(src => src.Fim.Value.ToString("dd/MM/yyyy hh:mm")))
              .ReverseMap();

            CreateMap<Propostas, RelatorioPropostaClienteDTO>()
               .ForMember(d => d.Cliente, opt => opt.MapFrom(src => src.Cliente.NomeFantasia))
               .ForMember(d => d.DataCriacao, opt => opt.MapFrom(src => src.DataCriacao.ToString("dd/MM/yyyy hh:mm")))
             .ReverseMap();

        }
    }
}