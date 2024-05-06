import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddProjetoModalComponent } from '../../../modal-overlays/dialog/add-projeto/add-projeto-modal.component';
import { ProjetoService } from '../../../../@core/backend/common/services/projeto.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-projeto-listar',
  templateUrl: './projeto-listar.component.html',
  styleUrls: ['./projeto-listar.component.scss'],
  providers: [ProjetoService]
})
export class ProjetoListarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  projetoForm: FormGroup;

  //Toast config
  status: NbComponentStatus = 'success';
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };

  source: LocalDataSource = new LocalDataSource();

  settings = {
    noDataMessage: 'Nenhum projeto encontrado.',
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
      addButtonContent: '<i class="nb-plus" (click)="addProjeto()"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      confirmSave: true
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        width: '10px'
      },
      nome: {
        title: 'Nome',
        type: 'string',
        width: '1000px'
      }
    },
  };

  get id() { return this.projetoForm.get('id'); }
  get nome() { return this.projetoForm.get('nome'); }

  constructor(public accessChecker: NbAccessChecker,
    private projetoService: ProjetoService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.projetoForm = this.fb.group({
      id: this.fb.control(''),
      nome: this.fb.control('')
    });

    this.loadProjetos();
  }

  loadProjetos() {
    this.projetoService.getAll()
      .subscribe((res) => {
        this.source.load(res["body"]);
      });
  }

  onEditRowSelect(event): void {
    this.dialogService.open(AddProjetoModalComponent, {
      context: {
        title: 'Alterar projeto',
        id: event.data.id,
        idCliente: this.projetoForm.controls["id"].value
      },
    }).onClose.subscribe(result => this.loadProjetos());
  }

  onCreateRowSelect(event): void {
    this.dialogService.open(AddProjetoModalComponent, {
      context: {
        title: 'Cadastrar projeto',
        id: 0,
        idCliente: this.projetoForm.controls["id"].value
      },
    }).onClose.subscribe(result => this.loadProjetos());
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
    this.projetoService.delete(id)
      .subscribe((res) => {
        this.toastrService.show("Projeto excluido com sucesso!", "Sucesso!", this.config);
        this.loadProjetos();
      }, error => {
        this.toastrService.warning("Erro ao excluir projeto, contacte o administrador!", "Erro!");
        console.log(error);
      });
  }
}
