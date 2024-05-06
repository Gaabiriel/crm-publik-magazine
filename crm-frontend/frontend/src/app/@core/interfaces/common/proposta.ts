import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Proposta {
  id: number;
  descricao: string;
  agencia: string;
  status: string;
  dataCriacao: Date;
  idCliente: number;
}

export interface OpcaoProposta {
  formatoAnuncio: string;
  valor: string;
  valorEspecial: string;
  pagamento: string;
  localizacao: string;
  observacoes: string;
  idProposta: number;
}

export abstract class PropostaData {
  abstract get gridDataSource(): DataSource;
  abstract getAll(): Observable<Proposta>;
  abstract getById(id: number): Observable<Proposta>;
  abstract update(id: number, proposta: Proposta): Observable<Proposta>;
  abstract create(proposta: Proposta): Observable<Proposta>;
  abstract delete(id: number): Observable<boolean>;
  abstract getAllPropostaFiltered(start: Date, end: Date, projetoId: number, statusProposta:string): Observable<any>;
}
