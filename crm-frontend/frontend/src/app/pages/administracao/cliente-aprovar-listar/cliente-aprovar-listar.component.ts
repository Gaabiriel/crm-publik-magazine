import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { ClienteService } from '../../../@core/backend/common/services/cliente.service';
import { ImportarClienteComponent } from '../../modal-overlays/dialog/importar-cliente/importar-cliente.component';
import { ButtonAprovarClienteComponent } from '../../ui-features/button-grid/button-aprovar-cliente.component';
import { ProjetoService } from '../../../@core/backend/common/services/projeto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-cliente-aprovar-listar',
  templateUrl: './cliente-aprovar-listar.component.html',
  styleUrls: ['./cliente-aprovar-listar.component.scss'],
  providers: [ClienteService, ProjetoService]
})
export class ClienteAprovarListarComponent {
  //Toast config
  status: NbComponentStatus = 'success';
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };

  source: ServerDataSource;
 
  settings = {
    noDataMessage: 'Nenhum cliente encontrado.',
    actions: {
      position: 'right',
      columnTitle: 'Ações',
      delete: false,
      add: false,
      edit: false,
    },
    rowClassFunction: (row) => {
      return 'display: none;';
    },
    columns: {
      projeto: {
        title: 'Projeto',
        type: 'string',
        valuePrepareFunction: (projeto) => {
          return projeto.nome;
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return cell.nome.toUpperCase().match(search.toUpperCase());
          }
        }
      },
      nomeFantasia: {
        title: 'Nome Fantasia',
        type: 'string',
      },
      cnpj: {
        title: 'Cnpj',
        type: 'string',
      },
      telefoneFixo: {
        title: 'Telefone Fixo',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      site: {
        title: 'Site',
        type: 'string',
      },
      Aprovar: {
        title: 'Ações',
        type: 'custom',
        renderComponent: ButtonAprovarClienteComponent,
        onComponentInitFunction: (instance) => {
          instance.onAprovadoEmitter
            .subscribe((data) => {
              this.loadClientes();
            });
        },
        filter: false,
      },
    }

  };
  loading = false;

  constructor(public accessChecker: NbAccessChecker,
    private clienteService: ClienteService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
    private _http: HttpClient) {
    this.loadClientes();
  }

  loadClientes() {
    this.source = this.clienteService.getClienteDataSource(false); 
  } 
}
