
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Autorizante {
  Id: number;
  Nome: string;
  Email: string;
  Cargo: string;
  TelefoneFixo: string;
  Celular: string;
  IdCliente: string;
}

export abstract class AutorizanteData {
  abstract get gridDataSource(): DataSource;
  abstract getAll(): Observable<Autorizante>;
  abstract getById(id: number): Observable<Autorizante>;
  abstract update(id: number, autorizante: Autorizante): Observable<Autorizante>;
  abstract create(autorizante: Autorizante): Observable<Autorizante>;
  // abstract delete(id: number): Observable<boolean>;
}
