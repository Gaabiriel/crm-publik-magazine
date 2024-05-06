import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Contato {
  id: number;
  nome: string;
  aniversario: string;
  telefoneFixo: string;
  celular: string;
  email: string;
  idCliente: number;
}

export abstract class ContatoData {
  abstract get gridDataSource(): DataSource;
  abstract getAll(): Observable<Contato>;
  abstract getById(id: number): Observable<Contato>;
  abstract update(id: number, contato: Contato): Observable<Contato>;
  abstract create(contato: Contato): Observable<Contato>;
  abstract delete(id: number): Observable<boolean>;
}
