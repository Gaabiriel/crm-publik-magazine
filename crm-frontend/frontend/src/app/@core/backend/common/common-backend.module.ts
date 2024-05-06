import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountryData } from '../../interfaces/common/countries';
import { CountriesService } from './services/countries.service';
import { CountriesApi } from './api/countries.api';
import { SettingsApi } from './api/settings.api';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './services/settings.service';
import { ClienteApi } from './api/cliente.api';
import { ContatoApi } from './api/contato.api';
import { AutorizanteApi } from './api/autorizante.api';
import { FinanceiroApi } from './api/financeiro.api';
import { ClienteData } from '../../interfaces/common/cliente';
import { ContatoData } from '../../interfaces/common/contato';
import { AutorizanteData } from '../../interfaces/common/autorizante';
import { FinanceiroData } from '../../interfaces/common/financeiro';
import { ClienteService } from './services/cliente.service';
import { AutorizanteService } from './services/autorizante.service';
import { ContatoService } from './services/contato.service';
import { FinanceiroService } from './services/financeiro.service';
import { PerfilService } from './services/perfil.service';
import { PerfilData } from '../../interfaces/common/perfil';
import { PerfilApi } from './api/perfil.api';
import { UploadService } from './services/upload.service';
import { UploadData } from '../../interfaces/common/upload';
import { UploadApi } from './api/upload.api';
import { PropostaService } from './services/proposta.service';
import { PropostaData } from '../../interfaces/common/proposta';
import { PropostaApi } from './api/proposta.api';
import { ProjetoApi } from './api/projeto.api';
import { ProjetoData } from '../../interfaces/common/projeto';
import { ProjetoService } from './services/projeto.service';

const API = [
  UsersApi,
  CountriesApi,
  SettingsApi,
  HttpService,
  ClienteApi,
  ContatoApi,
  AutorizanteApi,
  FinanceiroApi,
  PerfilApi,
  UploadApi,
  PropostaApi,
  ProjetoApi];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: CountryData, useClass: CountriesService },
  { provide: SettingsData, useClass: SettingsService },
  { provide: ClienteData, useClass: ClienteService },
  { provide: ContatoData, useClass: ContatoService },
  { provide: AutorizanteData, useClass: AutorizanteService },
  { provide: FinanceiroData, useClass: FinanceiroService },
  { provide: PerfilData, useClass: PerfilService },
  { provide: UploadData, useClass: UploadService },
  { provide: PropostaData, useClass: PropostaService },
  { provide: ProjetoData, useClass: ProjetoService },
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
