import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Projeto {
  id: number;
  nome: string;
}

export abstract class ProjetoData {
  abstract getAll(): Observable<Projeto>;
  abstract getById(id: number): Observable<Projeto>;
  abstract update(id: number, proposta: Projeto): Observable<Projeto>;
  abstract create(proposta: Projeto): Observable<Projeto>;
  abstract delete(id: number): Observable<boolean>;
}
