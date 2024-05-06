import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Observable } from 'rxjs';
import { RelatorioClienteFields, ReuniaoCliente } from '../../../interfaces/common/cliente';
import { HttpService } from './http.service';

@Injectable()
export class ClienteApi {
 
  private readonly apiController: string = 'cliente';

  constructor(private api: HttpService, private http: HttpClient) { }
 
  getAllForAutocomplete(onlyAprovado: boolean): any {
    return this.api.get(`${this.apiController}/GetAllForAutocomplete/${onlyAprovado}`);
  }  
  
  getAllReuniaoCliente(): Observable<any> {
    return this.api.get(`${this.apiController}/GetAllReuniaoCliente`);
  }

  getAllDailyReuniaoCliente(): Observable<any> {
    return this.api.get(`${this.apiController}/GetAllDailyReuniaoCliente`);
  }

  getAllReuniaoFiltered(start: Date, end: Date, projetoId: number): Observable<ReuniaoCliente> {
    let link = `${this.apiController}/GetAllReuniaoFiltered/${projetoId}`;
    let params = '';

    if (start) {
      params = 'start=' + start.toISOString() + '&'
    }

    if (end) {
      params += 'end=' + end.toISOString();
    }

    if (params) {
      link += `?${params}`;
    }

    return this.api.get(link);
  }

  getAllReuniaoByUsuarioId(start: Date, end: Date, usuarioId: number, perfilEmpresa: string): Observable<ReuniaoCliente> {
    let link = `${this.apiController}/GetAllReuniaoByUsuarioId/${usuarioId}/${perfilEmpresa}`;
    let params = '';

    if (start) {
      params = 'start=' + start.toISOString() + '&'
    }

    if (end) {
      params += 'end=' + end.toISOString();
    }

    if (params) {
      link += `?${params}`;
    }

    return this.api.get(link);
  }

  getById(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  getByNomeFantasia(nomeFantasia: string): Observable<any> {
    return this.api.get(`${this.apiController}/${nomeFantasia}`);
  }

  update(id: number, item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${id}`, item);
  }

  create(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/`, item);
  }

  createReuniao(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/CreateReuniao`, item);
  }

  updateReuniao(id: number, item: any): Observable<any> {
    return this.api.put(`${this.apiController}/EditReuniao/${id}`, item);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  aprovarCliente(id: number) {
    return this.api.post(`${this.apiController}/AprovarCliente/${id}`, null);
  }

  flagClienteContactada(id: number) {
    return this.api.post(`${this.apiController}/FlagClienteContactada/${id}`, null);
  }

  getRelatorioClienteFields(): Observable<RelatorioClienteFields> {
    return this.api.get(`${this.apiController}/GetRelatorioClienteFields`);
  }
 
  getAllPaged(onlyAprovado, pageNo: any, pageSize: any, sortOrder: any): Observable<any> {
    return this.api.get(`${this.apiController}/GetAllPaged?onlyAprovado=${onlyAprovado}&pageNo=${pageNo}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
  }

  getClientesDataSource(onlyAprovado): ServerDataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}/GetAllPaged?onlyAprovado=${onlyAprovado}`);
  }
}
