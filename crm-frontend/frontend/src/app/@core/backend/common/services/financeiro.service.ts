import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵbq } from 'ng2-smart-table';
import { FinanceiroApi } from '../api/financeiro.api';
import { Financeiro, FinanceiroData } from '../../../interfaces/common/financeiro';

@Injectable()
export class FinanceiroService extends FinanceiroData {

  constructor(private api: FinanceiroApi) {
    super();
  }

  getAll(): Observable<Financeiro> {
    return this.api.getAll();
  }

  get gridDataSource(): ɵbq {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Observable<Financeiro> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Financeiro> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Financeiro> {
    return this.api.update(id, user);
  }
}
