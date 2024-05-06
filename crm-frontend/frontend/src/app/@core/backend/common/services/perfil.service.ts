import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵbq } from 'ng2-smart-table';
import { Cliente, ClienteData } from '../../../interfaces/common/cliente';
import { ClienteApi } from '../api/cliente.api';
import { PerfilApi } from '../api/perfil.api';
import { Perfil, PerfilData } from '../../../interfaces/common/perfil';

@Injectable()
export class PerfilService extends PerfilData {

  constructor(private api: PerfilApi) {
    super();
  }

  getAll(): any {
    return this.api.getAll();
  }

  getById(id: number): Observable<Perfil> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Perfil> {
    return this.api.create(user);
  }
}
