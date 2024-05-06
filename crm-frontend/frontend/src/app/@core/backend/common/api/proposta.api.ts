import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class PropostaApi {
  private readonly apiController: string = 'proposta';

  constructor(private api: HttpService) { }

  getAll(): Observable<any> {
    return this.api.get(`${this.apiController}`);
  }

  getById(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  update(id: number, item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${id}`, item);
  }

  create(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/`, item);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  getAllPropostaFiltered(start: Date, end: Date, projetoId: number, statusProposta:string): Observable<any> {
    let link = `${this.apiController}/GetAllPropostaFiltered/${projetoId}/${statusProposta}`;
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
}
