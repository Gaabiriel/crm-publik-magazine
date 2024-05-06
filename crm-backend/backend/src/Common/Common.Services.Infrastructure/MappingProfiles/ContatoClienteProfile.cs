using AutoMapper;
using Common.DTO;
using Common.Entities;

namespace Common.Services.Infrastructure.MappingProfiles
{
    public class ContatoClienteProfile : Profile
    {
        public ContatoClienteProfile()
        {
            CreateMap<ContatoCliente, ContatoClienteDTO>()
               .ReverseMap();

            CreateMap<ContatoClienteDTO, ContatoCliente>()
               .ReverseMap();

            CreateMap<PropostasDTO, Propostas>()
               .ReverseMap();

            CreateMap<Propostas, PropostasDTO>()
               .ReverseMap();
        }
    }
}