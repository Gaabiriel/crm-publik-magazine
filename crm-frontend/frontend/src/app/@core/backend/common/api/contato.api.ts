import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../../../interfaces/common/contato';
import { HttpService } from './http.service';

@Injectable()
export class ContatoApi {

  private readonly apiController: string = 'contatoCliente';

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
}
