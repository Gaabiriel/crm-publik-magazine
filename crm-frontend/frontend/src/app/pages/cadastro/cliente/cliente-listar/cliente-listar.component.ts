import { Component, DebugNode, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { ClienteService } from '../../../../@core/backend/common/services/cliente.service';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ImportarClienteComponent } from '../../../modal-overlays/dialog/importar-cliente/importar-cliente.component';
import { NbAccessChecker } from '@nebular/security';
import { User } from '../../../../@core/interfaces/common/users';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { PaginationService } from '../../../../@core/backend/common/services/pagination.service';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss'],
  providers: [ClienteService, PaginationService]
})
export class ClienteListarComponent {

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
  filterFields = [];

  settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'Nenhum cliente encontrado.',
    editable: false,
    actions: {
      position: 'right',
      columnTitle: 'Ações',
    },
    rowClassFunction: (row) => {
      if (row.data.contactada) {
        return 'contactada';
      } else {
        return ''
      }
    },
    mode: 'external',
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      confirmSave: true
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
      usuario: {
        title: 'Contato Public',
        type: 'string',
        valuePrepareFunction: (usuario: User) => {
          if (usuario) {
            return usuario.firstName;
          }
          return '';
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            if (cell) {
              return cell.firstName.toUpperCase().match(search.toUpperCase());
            }
          }
        }
      },
      nomeFantasia: {
        title: 'Nome Fantasia',
        type: 'string',
      },
      razaoSocial: {
        title: 'Razão Social',
        type: 'string',
      },
      telefoneFixo: {
        title: 'Telefone Fixo',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      }
    }

  };
  loading = false;

  constructor(public accessChecker: NbAccessChecker,
    private clienteService: ClienteService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
    public paginationService: PaginationService,
    private _http: HttpClient) {
    this.loadClientes();
  }

  ngOnInit() {
    this.loadClientes();

    this.source.onChanged().subscribe((change) => {
      if (change.action === 'filter') {

        change.filter.filters.forEach(element => {
          let filterProp = { fieldName: element.field, fieldValue: element.search };
          this.filterFields.push(filterProp);

          this.filterFields = this.filterFields.reduce((unique, o) => {
            if (!unique.some(obj => obj.fieldName === element.field)) {
              unique.push(o);
            }
            return unique;
          }, []);
        });
      }
    });
  }

  onEdit(event) {
    console.log(event.data.clientId);
    this.router.navigate(['/clients/update-client/' + event.data.clientId]);
  }

  loadClientes() {
    this.source = this.clienteService.getClienteDataSource(true); 
  }
 

  onEditRowSelect(event): void {
    this.router.navigate(["/pages/cadastro/cliente/edit/", event.data.id]);
  }

  onCreateRowSelect(event): void {
    this.router.navigate(["/pages/cadastro/cliente/add"]);
  }

  onDeleteRowSelect(event, dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: {
          title: 'Você tem certeza que deseja excluir esse registro?',
          id: event.data.id
        }
      }
    );
  }

  excluir(id) {
    this.clienteService.delete(id)
      .subscribe((res) => {
        this.toastrService.show("Cliente excluido com sucesso!", "Sucesso!", this.config);
        this.loadClientes();
      }, error => {
        this.toastrService.warning("Erro ao excluir cliente!", "Sucesso!", this.config);
      });
  }

  openImportarClienteModal() {
    this.dialogService.open(ImportarClienteComponent)
      .onClose.subscribe(res => {
        this.loadClientes();
      });
  }

  // exportar() {
  //   const options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     headers: [
  //       'name',
  //       'age',
  //       'average',
  //       'approved',
  //       'description',
  //     ],
  //     nullToEmptyString: true,
  //   };
  //   this.source.getAll().then(data => {
  //     new Angular5Csv(data, 'report', options);
  //   });
  // }
}
