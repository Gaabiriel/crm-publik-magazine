import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class ProjetoApi {
  private readonly apiController: string = 'projeto';

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
