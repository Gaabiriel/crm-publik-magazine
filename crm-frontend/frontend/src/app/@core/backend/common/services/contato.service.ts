import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵbq } from 'ng2-smart-table';
import { Contato, ContatoData } from '../../../interfaces/common/contato';
import { ContatoApi } from '../api/contato.api';

@Injectable()
export class ContatoService extends ContatoData {

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

  constructor(private api: ContatoApi) {
    super();
  }

  getAll(): Observable<Contato> {
    return this.api.getAll();
  }

  get gridDataSource(): ɵbq {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Observable<Contato> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Contato> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Contato> {
    return this.api.update(id, user);
  }
}
