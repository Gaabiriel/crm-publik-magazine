import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵbq } from 'ng2-smart-table';
import { Autorizante, AutorizanteData } from '../../../interfaces/common/autorizante';
import { AutorizanteApi } from '../api/autorizante.api';

@Injectable()
export class AutorizanteService extends AutorizanteData {

  constructor(private api: AutorizanteApi) {
    super();
  }

  getAll(): Observable<Autorizante> {
    return this.api.getAll();
  }

  get gridDataSource(): ɵbq {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Observable<Autorizante> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Autorizante> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Autorizante> {
    return this.api.update(id, user);
  }
}
