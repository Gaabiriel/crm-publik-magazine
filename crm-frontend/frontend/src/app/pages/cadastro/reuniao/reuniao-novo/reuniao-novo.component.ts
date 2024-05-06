import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { ButtonGridComponent } from '../../../ui-features/button-grid/button-grid.component';
import { Cliente, ReuniaoCliente } from '../../../../@core/interfaces/common/cliente';
import { debounceTime } from 'rxjs/operators';
import { ClienteService } from '../../../../@core/backend/common/services/cliente.service';
import { AddReuniaoModalComponent } from '../../../modal-overlays/dialog/add-reuniao/add-reuniao-modal.component';
import { User } from '../../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-reuniao-novo',
  templateUrl: './reuniao-novo.component.html',
  styleUrls: ['./reuniao-novo.component.scss'],
  providers: [ClienteService]
})

export class ReuniaoNovoComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  @Input() clienteId: number;
  @ViewChild('dialogAdd', { static: false }) dialogAdd: TemplateRef<any>;
  @ViewChild('dialogEdit', { static: false }) dialogEdit: TemplateRef<any>;

  reunioes: ReuniaoCliente[];

  reuniaoSource: LocalDataSource = new LocalDataSource();
  reuniaoSettings = {
    noDataMessage: 'Nenhuma reunião encontrada.',
    actions: {
      delete: false,
      position: 'right',
      columnTitle: 'Ações',
    },
    rowClassFunction: (row) => {
      return 'display: none;';
    },
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      confirmSave: true
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'string',
      },
      descricao: {
        title: 'Descrição',
        type: 'string',
      },
      comeco: {
        title: 'Começo',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy HH:mm');
        }
      },
      fim: {
        title: 'Fim',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy HH:mm');
        }
      },
      // usuario: {
      //   title: 'Contato',
      //   type: 'string',
      //   valuePrepareFunction: (usuario: User) => {
      //     if (usuario) {
      //       return usuario.firstName;
      //     }
      //     return '';
      //   },
      //   filterFunction: (cell?: any, search?: string) => {
      //     if (search.length > 0) {
      //       if (cell) {
      //         return cell.firstName.toUpperCase().match(search.toUpperCase());
      //       }
      //     }
      //   }
      // },
    },
    // cliente: {
    //   title: 'Cliente',
    //   type: 'string',
    //   valuePrepareFunction: (cliente: Cliente) => {
    //     if (cliente) {
    //       return cliente.nomeFantasia;
    //     }
    //     return '';
    //   },
    //   filterFunction: (cell?: Cliente, search?: string) => {
    //     if (search.length > 0) {
    //       if (cell) {
    //         return cell.nomeFantasia.toUpperCase().match(search.toUpperCase());
    //       }
    //     }
    //   }
    // },

  };

  constructor(
    private clientesService: ClienteService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadReuniaoCliente();
  }

  loadReuniaoCliente() {
    this.clientesService.getAllReuniaoCliente()
      .pipe(debounceTime(20000))
      .subscribe((res) => {
        let result = res["body"];
        this.reunioes = result;
        this.reunioes = this.reunioes.filter(x => x.idCliente === this.clienteId);
        this.reuniaoSource.load(this.reunioes);
      });
  }

  convertToReuniao(value: any): ReuniaoCliente {
    const reuniao: ReuniaoCliente = value;
    return reuniao;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEditRowSelect(event): void {
    const reuniao = this.reunioes.find(x => x.id == event.data.id);
    this.dialogService.open(AddReuniaoModalComponent, {
      context: {
        title: 'Alterar reuniao',
        idCliente: this.clienteId,
        reuniao: reuniao,
        isFromDashboard: false
      }, dialogClass: 'model-full'
    }).onClose.subscribe(result => this.loadReuniaoCliente());
  }

  onCreateRowSelect(): void {
    this.dialogService.open(AddReuniaoModalComponent, {
      context: {
        title: 'Cadastrar reuniao',
        idCliente: this.clienteId,
        reuniao: null,
        isFromDashboard: false
      }, dialogClass: 'model-full'
    }).onClose.subscribe(result => this.loadReuniaoCliente());
  }

  onDeleteRowSelect(event, dialogReuniao: TemplateRef<any>) {
    this.dialogService.open(
      dialogReuniao,
      {
        context: {
          title: 'Você tem certeza que deseja excluir essa reuniao?',
          id: event.data.id
        }
      }
    );
  }

  onReuniaoDelete(result) {
    // this.reunioesService.delete(result.id)
    //   .subscribe(res => {
    //     this.toasterService.success('', `Excluído com sucesso!`);
    //     this.loadReuniaoCliente();
    //   }, err => {
    //     this.toasterService.danger('', `Erro ao excluir o reuniao!`);
    //   });
  }
}

