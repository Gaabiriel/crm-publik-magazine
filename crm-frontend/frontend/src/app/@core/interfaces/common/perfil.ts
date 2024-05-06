

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Perfil {
  id: number;
  nome: string;
}

export abstract class PerfilData {
  abstract getAll(): Observable<Perfil>;
  abstract getById(id: number): Observable<Perfil>;
  abstract create(perfil: Perfil): Observable<Perfil>;
}

