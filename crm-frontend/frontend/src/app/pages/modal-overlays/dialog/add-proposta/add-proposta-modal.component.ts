import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { PropostaService } from '../../../../@core/backend/common/services/proposta.service';
import { Proposta } from '../../../../@core/interfaces/common/proposta';
import { SmartTableData } from '../../../../@core/interfaces/common/smart-table';

@Component({
  selector: 'ngx-add-proposta-modal',
  templateUrl: './add-proposta-modal.component.html',
  styleUrls: ['./add-proposta-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PropostaService]
})
export class AddPropostaModalComponent implements OnInit {
  //Toast config
  toastStatus: NbComponentStatus = 'success';
  config = {
    status: this.toastStatus,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };


  @Input() title: string;
  @Input() id: number;
  @Input() idCliente: number;
  propostaForm: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  proposta: Proposta;
  agenciaToggle = true;

  statusProposta = [
    {
      id: 1,
      name: 'Negativou',
    },
    {
      id: 2,
      name: 'Difícil',
    },
    {
      id: 3,
      name: 'Provável',
    },
    {
      id: 4,
      name: 'Muito provável',
    },
    {
      id: 5,
      name: 'Fechado',
    }
  ]; 
  
  settingsOpcaoProposta = {
    actions: {
      position: 'right',
      columnTitle: 'Ações',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      formatoAnuncio: {
        title: 'Anúncio',
        type: 'string',
      },
      valor: {
        title: 'Valor',
        type: 'string',
      },
      valorEspecial: {
        title: 'Valor Especial',
        type: 'string',
      },
      pagamento: {
        title: 'Pagamento',
        type: 'string',
      },
      localizacao: {
        title: 'Localização',
        type: 'string',
      },
      observacoes: {
        title: 'Observações',
        type: 'string',
      },
    },
  };
  sourceOpcaoProposta: LocalDataSource = new LocalDataSource();

  constructor(protected ref: NbDialogRef<AddPropostaModalComponent>,
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private propostaService: PropostaService,
    protected router: Router,
    private toastrService: NbToastrService,
    private service: SmartTableData) {

    const data = this.service.getData();
    this.sourceOpcaoProposta.load(data);

    this.propostaForm = this.fb.group({
      descricao: this.fb.control(''),
      status: this.fb.control(''),
      isAgencia: this.fb.control(''),
      dataCriacao: this.fb.control(''),
      idCliente: this.fb.control(''),
      idProjeto: this.fb.control('', [Validators.required, Validators.minLength(1)]),
    });

  }

  get descricao() { return this.propostaForm.get('descricao'); }
  get status() { return this.propostaForm.get('status'); }
  get dataCriacao() { return this.propostaForm.get('dataCriacao'); }
  get isAgencia() { return this.propostaForm.get('isAgencia'); }

  ngOnInit(): void {
    if (this.id) {
      this.propostaService.getById(this.id)
        .subscribe((response) => {
          let res = response["body"];
          this.propostaForm.controls['descricao'].setValue(res.descricao);
          this.propostaForm.controls['status'].setValue(res.status);
          this.propostaForm.controls['dataCriacao'].setValue(res.dataCriacao);

          if (res.agencia == "Sim") {
            this.propostaForm.controls['isAgencia'].setValue(true);
          } else {
            this.propostaForm.controls['isAgencia'].setValue(false);
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.propostaForm.controls['isAgencia'].setValue(true);
    }

  }

  save(): void {

    const proposta: Proposta = this.convertToProposta(this.propostaForm.value);
    proposta.idCliente = this.idCliente;

    if (this.propostaForm.value.isAgencia) {
      proposta.agencia = "Sim";
    } else {
      proposta.agencia = "Não";
    }

    if (this.id) {
      proposta.id = this.id;
      this.propostaService.update(this.id, proposta).subscribe((result: any) => {
        this.toastrService.show("Proposta alterado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
      }, error => {
        console.log(error);
      });
    } else {
      this.propostaService.create(proposta).subscribe((result: any) => {
        this.toastrService.show("Proposta cadastrado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
      }, error => {
        console.log(error);
      });
    }
  }

  dismiss() {
    this.ref.close();
  }

  getFormatedDate(date: any) {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().substring(0, 10);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  convertToProposta(value: any): Proposta {
    const proposta: Proposta = value;
    return proposta;
  }
}

