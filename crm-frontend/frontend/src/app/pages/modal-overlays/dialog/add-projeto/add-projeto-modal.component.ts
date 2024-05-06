import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ProjetoService } from '../../../../@core/backend/common/services/projeto.service';
import { Projeto } from '../../../../@core/interfaces/common/projeto';

@Component({
  selector: 'ngx-add-projeto-modal',
  templateUrl: './add-projeto-modal.component.html',
  styleUrls: ['./add-projeto-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjetoService]
})

export class AddProjetoModalComponent implements OnInit {
  //Toast config
  status: NbComponentStatus = 'success';
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };


  @Input() title: string;
  @Input() id: number;
  @Input() idCliente: number;
  projetoForm: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  projeto: Projeto = {
    id: 0,
    nome: ''
  };


  constructor(protected ref: NbDialogRef<AddProjetoModalComponent>,
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private projetoService: ProjetoService,
    protected router: Router,
    private toastrService: NbToastrService) {

    this.projetoForm = this.fb.group({
      id: this.fb.control(''),
      nome: this.fb.control(''),
    });

  }

  get nome() { return this.projetoForm.get('nome'); }

  ngOnInit(): void {
    if (this.id) {
      this.projetoService.getById(this.id)
        .subscribe((response) => {
          let res = response["body"];
          this.projetoForm.controls['nome'].setValue(res.nome);
          this.projetoForm.controls['id'].setValue(res.celular);
        }, error => {
          console.log(error);
        });
    }

  }

  save(): void {
    this.projeto = this.projetoForm.value;

    if (this.id) {
      this.projeto.id = this.id;
      this.projetoService.update(this.id, this.projeto).subscribe((result: any) => {
        this.toastrService.show("Projeto alterado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
      }, error => {
        console.log(error);
      });
    } else {
      this.projetoService.create(this.projeto).subscribe((result: any) => {
        this.toastrService.show("Projeto cadastrado com sucesso!", "Sucesso!", this.config);
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
}

