import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Contato, ContatoData } from '../../../../@core/interfaces/common/contato';
import { DatePipe } from '@angular/common';
import { AddContatoModalComponent } from '../../../modal-overlays/dialog/add-contato/add-contato-modal.component';

@Component({
  selector: 'ngx-contato-novo',
  templateUrl: './contato-novo.component.html',
  styleUrls: ['./contato-novo.component.scss'],
})
export class ContatoNovoComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  @Input() clienteId: number;
  @ViewChild('dialogAdd', { static: false }) dialogAdd: TemplateRef<any>;
  @ViewChild('dialogEdit', { static: false }) dialogEdit: TemplateRef<any>;

  contatos: Contato[];

  contatoSource: LocalDataSource = new LocalDataSource();
  contatoSettings = {
    noDataMessage: 'Nenhum contato encontrado.',
    actions: {
      position: 'right',
      columnTitle: 'Ações',
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
      cargo: {
        title: 'Cargo',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      celular: {
        title: 'Celular',
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
      aniversario: {
        title: 'Aniversário',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MMM yyyy');
        }
      }
    },

  };

  loading = false;

  constructor(
    private contatosService: ContatoData,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    // this.loadContatos();
  }

  loadContatos() {
    this.contatosService.getAll()
      .subscribe((res) => {
        this.contatos = res["body"];
        this.contatoSource.load(this.contatos.filter(x => x.idCliente === this.clienteId));
      });
  }

  convertToContato(value: any): Contato {
    const contato: Contato = value;
    return contato;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEditRowSelect(event): void {
    this.dialogService.open(AddContatoModalComponent, {
      context: {
        title: 'Alterar contato',
        id: event.data.id,
        idCliente: this.clienteId
      },
    }).onClose.subscribe(() => this.loadContatos());
  }

  onCreateRowSelect(): void {
    this.dialogService.open(AddContatoModalComponent, {
      context: {
        title: 'Cadastrar contato',
        id: 0,
        idCliente: this.clienteId
      },
    }).onClose.subscribe(() => this.loadContatos());
  }

  onDeleteRowSelect(event, dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: {
          title: 'Você tem certeza que deseja excluir esse contato?',
          id: event.data.id
        }
      }
    );
  }

  onDelete(result) {
    this.contatosService.delete(result.id)
      .subscribe(() => {
        this.toasterService.success('', `Excluído com sucesso!`);
        this.loadContatos();
      }, () => {
        this.toasterService.danger('', `Erro ao excluir o contato!`);
      });
  }
}

