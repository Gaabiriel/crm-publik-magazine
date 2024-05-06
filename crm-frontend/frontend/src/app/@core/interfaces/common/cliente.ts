import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { CalendarEvent } from 'angular-calendar';
import { User } from './users';
import { ServerDataSource } from 'ng2-smart-table';

export interface Cliente {
  id: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  telefoneFixo: string;
  endereco: string;
  cep: string;
  email: string;
  site: string;
  dataFundacao: string;
  projetoId: string;
  inscricaoSocial: string;
  nomeContato: string;
  complemento: string;
  cidade: string;
  uf: string;
  associado: string;
  atualizado: string;
  aprovado: boolean;
  perfilEmpresa: string;
  usuario: User;
  contactada: boolean;
}

export interface ClienteAutoComplete {
  id: number;
  nome: string;
}

export interface ReuniaoCliente extends CalendarEvent {
  id: number;
  nome: string;
  descricao: string;
  comeco: Date;
  fim: Date;
  idCliente: number;
  idUsuario: number;
  usuario: User;
  cliente: Cliente;
}

export interface RelatorioClienteFields {
  id: number;
  propertyName: string;
  propertyDescription: string;
}

export abstract class ClienteData {
  abstract getAllForAutocomplete(onlyAprovado: boolean): Observable<Cliente>;  
  abstract getAllReuniaoCliente(): Observable<ReuniaoCliente>;
  abstract getAllReuniaoFiltered(start: Date, end: Date, projetoId: number, perfilEmpresa: string): Observable<ReuniaoCliente>;
  abstract getAllDailyReuniaoCliente(): Observable<ReuniaoCliente>;
  abstract getById(id: number): Observable<Cliente>;
  abstract update(id: number, Cliente: Cliente): Observable<Cliente>;
  abstract create(Cliente: Cliente): Observable<Cliente>;
  abstract updateReuniao(id: number, ReuniaoCliente: ReuniaoCliente): Observable<Cliente>;
  abstract createReuniao(ReuniaoCliente: ReuniaoCliente): Observable<Cliente>;
  abstract aprovarCliente(id: number): Observable<any>;
  abstract flagClienteContactada(id: number): Observable<any>;
  abstract getRelatorioClienteFields(): Observable<RelatorioClienteFields>;
  abstract getClienteDataSource(onlyAprovado): ServerDataSource;

  // abstract delete(id: number): Observable<boolean>;
}