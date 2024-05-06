import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetoApi } from '../api/projeto.api';
import { Projeto, ProjetoData } from '../../../interfaces/common/projeto';

@Injectable()
export class ProjetoService extends ProjetoData {

  constructor(private api: ProjetoApi) {
    super();
  }

  getAll(): Observable<Projeto> {
    return this.api.getAll();
  }

  getById(id: number): Observable<Projeto> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Projeto> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Projeto> {
    return this.api.update(id, user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

}
