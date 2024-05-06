
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Financeiro {
  Id: number;
  Nome: string;
  Email: string;
  TelefoneFixo: string;
  Celular: string;
  IdCliente: string;
}

export abstract class FinanceiroData {
  abstract get gridDataSource(): DataSource;
  abstract getAll(): Observable<Financeiro>;
  abstract getById(id: number): Observable<Financeiro>;
  abstract update(id: number, financeiro: Financeiro): Observable<Financeiro>;
  abstract create(financeiro: Financeiro): Observable<Financeiro>;
  // abstract delete(id: number): Observable<boolean>;
}
