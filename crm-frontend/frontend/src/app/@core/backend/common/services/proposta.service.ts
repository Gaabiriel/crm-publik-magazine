import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵbq } from 'ng2-smart-table';
import { Proposta, PropostaData } from '../../../interfaces/common/proposta';
import { PropostaApi } from '../api/proposta.api';

@Injectable()
export class PropostaService extends PropostaData {


  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

  constructor(private api: PropostaApi) {
    super();
  }

  getAll(): Observable<Proposta> {
    return this.api.getAll();
  }

  get gridDataSource(): ɵbq {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Observable<Proposta> {
    return this.api.getById(id);
  }

  create(user: any): Observable<Proposta> {
    return this.api.create(user);
  }

  update(id: number, user: any): Observable<Proposta> {
    return this.api.update(id, user);
  }

  getAllPropostaFiltered(start: Date, end: Date, projetoId: number, statusProposta : string): Observable<any> {
    return this.api.getAllPropostaFiltered(start, end, projetoId, statusProposta);
  }
}
