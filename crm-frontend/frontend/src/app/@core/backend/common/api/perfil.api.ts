import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class PerfilApi {
  private readonly apiController: string = 'perfil';

  constructor(private api: HttpService) { }

  getAll(): Observable<any> {
    return this.api.get(`${this.apiController}`);
  }

  getById(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  create(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/`, item);
  }
}
