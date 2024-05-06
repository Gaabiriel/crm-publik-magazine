import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Proposta, PropostaData } from '../../../../@core/interfaces/common/proposta';
import { ButtonGridComponent } from '../../../ui-features/button-grid/button-grid.component';
import { AddPropostaModalComponent } from '../../../modal-overlays/dialog/add-proposta/add-proposta-modal.component';

@Component({
  selector: 'ngx-proposta-novo',
  templateUrl: './proposta-novo.component.html',
  styleUrls: ['./proposta-novo.component.scss'],
})

export class PropostaNovoComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  @Input() clienteId: number;
  @ViewChild('dialogAdd', { static: false }) dialogAdd: TemplateRef<any>;
  @ViewChild('dialogEdit', { static: false }) dialogEdit: TemplateRef<any>;

  propostas: Proposta[];

  propostasSource: LocalDataSource = new LocalDataSource();
  propostasSettings = {
    noDataMessage: 'Nenhuma proposta encontrada.',
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
      status: {
        title: 'Status',
        type: 'string',
      },
      descricao: {
        title: 'Descrição',
        type: 'custom',
        renderComponent: ButtonGridComponent,
        filter: false
      },
      agencia: {
        title: 'Agência',
        type: 'string',
      },
      dataCriacao: {
        title: 'Data da Proposta',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MMM yyyy');
        }
      }
    },

  };

  constructor(
    private propostasService: PropostaData,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadPropostas();
  }

  loadPropostas() {
    this.propostasService.getAll()
      .subscribe((res) => {
        this.propostas = res["body"];
        this.propostasSource.load(this.propostas.filter(x => x.idCliente == this.clienteId));
      });
  }

  convertToProposta(value: any): Proposta {
    const proposta: Proposta = value;
    return proposta;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEditPropostaRowSelect(event): void {
    this.dialogService.open(AddPropostaModalComponent, {
      context: {
        title: 'Alterar proposta',
        id: event.data.id,
        idCliente: this.clienteId
      }, dialogClass: 'model-full'
    }).onClose.subscribe(result => this.loadPropostas());
  }

  onCreatePropostaRowSelect(): void {
    this.dialogService.open(AddPropostaModalComponent, {
      context: {
        title: 'Cadastrar proposta',
        id: 0,
        idCliente: this.clienteId
      }, dialogClass: 'model-full'
    }).onClose.subscribe(result => this.loadPropostas());
  }

  onDeletePropostaRowSelect(event, dialogProposta: TemplateRef<any>) {
    this.dialogService.open(
      dialogProposta,
      {
        context: {
          title: 'Você tem certeza que deseja excluir essa proposta?',
          id: event.data.id
        }
      }
    );
  }

  onPropostaDelete(result) {
    this.propostasService.delete(result.id)
      .subscribe(res => {
        this.toasterService.success('', `Excluído com sucesso!`);
        this.loadPropostas();
      }, err => {
        this.toasterService.danger('', `Erro ao excluir o proposta!`);
      });
  }
}

