import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerDataSource, ɵbq } from 'ng2-smart-table';
import { Cliente, ClienteData, RelatorioClienteFields, ReuniaoCliente } from '../../../interfaces/common/cliente';
import { ClienteApi } from '../api/cliente.api';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class ClienteService extends ClienteData {
  
  constructor(private api: ClienteApi) {
    super();
  } 

  getAllForAutocomplete(onlyAprovado: boolean): any {
    return this.api.getAllForAutocomplete(onlyAprovado);
  } 

  getAllReuniaoCliente(): any {
    return this.api.getAllReuniaoCliente();
  }

  getAllDailyReuniaoCliente(): any {
    return this.api.getAllDailyReuniaoCliente();
  } 

  getById(id: number): Observable<Cliente> {
    return this.api.getById(id);
  } 

  create(user: any): Observable<Cliente> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Cliente> {
    return this.api.update(id, user);
  }

  createReuniao(item: any): Observable<any> {
    return this.api.createReuniao(item);
  }

  updateReuniao(id: number, item: any): Observable<any> {
    return this.api.updateReuniao(id, item);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

  aprovarCliente(id: number) {
    return this.api.aprovarCliente(id);
  }

  flagClienteContactada(id: number) {
    return this.api.flagClienteContactada(id);
  }

  getRelatorioClienteFields(): Observable<RelatorioClienteFields> {
    return this.api.getRelatorioClienteFields();
  }

  getAllReuniaoFiltered(start: Date, end: Date, projetoId: number): Observable<ReuniaoCliente> {
    return this.api.getAllReuniaoFiltered(start, end, projetoId);
  }

  getAllReuniaoByUsuarioId(start: Date, end: Date, usuarioId: number, perfilEmpresa: string): Observable<ReuniaoCliente> {
    return this.api.getAllReuniaoByUsuarioId(start, end, usuarioId, perfilEmpresa);
  } 
  getAllPaged(onlyAprovado, pageNo, pageSize, sortOrder): Observable<any> { 
    return this.api.getAllPaged(onlyAprovado,pageNo, pageSize, sortOrder); 
  } 

  getClienteDataSource(onlyAprovado): ServerDataSource {
    return this.api.getClientesDataSource(onlyAprovado);
  }
}
