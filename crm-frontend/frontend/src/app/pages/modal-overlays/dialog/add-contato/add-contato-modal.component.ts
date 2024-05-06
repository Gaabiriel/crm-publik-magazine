import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { format } from 'date-fns';
import { ContatoService } from '../../../../@core/backend/common/services/contato.service';

@Component({
  selector: 'ngx-add-contato-modal',
  templateUrl: './add-contato-modal.component.html',
  styleUrls: ['./add-contato-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContatoService]
})
export class AddContatoModalComponent implements OnInit {
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
  contatoForm: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  contato: any = {};


  constructor(protected ref: NbDialogRef<AddContatoModalComponent>,
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    protected router: Router,
    private toastrService: NbToastrService) {

    this.contatoForm = this.fb.group({
      nome: this.fb.control(''),
      telefoneFixo: this.fb.control(''),
      celular: this.fb.control(''),
      email: this.fb.control(''),
      cargo: this.fb.control(''),
      aniversario: this.fb.control(''),
      idContato: this.fb.control(''),
    });

  }

  get nome() { return this.contatoForm.get('nome'); }
  get celular() { return this.contatoForm.get('celular'); }
  get telefoneFixo() { return this.contatoForm.get('telefoneFixo'); }
  get email() { return this.contatoForm.get('email'); }
  get cargo() { return this.contatoForm.get('cargo'); }
  get aniversario() { return this.contatoForm.get('aniversario'); }
  get idContato() { return this.contatoForm.get('idContato'); }

  ngOnInit(): void {
    if (this.id) {
      this.contatoService.getById(this.id)
        .subscribe((response) => {
          let res = response["body"];
          this.contatoForm.controls['nome'].setValue(res.nome);
          this.contatoForm.controls['celular'].setValue(res.celular);
          this.contatoForm.controls['telefoneFixo'].setValue(res.telefoneFixo);
          this.contatoForm.controls['email'].setValue(res.email);
          this.contatoForm.controls['cargo'].setValue(res.cargo);
          this.contatoForm.controls['aniversario'].setValue(new Date(res.aniversario));

        }, error => {
          console.log(error);
        });
    }

  }

  save(): void {
    this.contato = this.contatoForm.value;
    this.contato.idCliente = this.idCliente;

    if (this.id) {
      this.contato.id = this.id;
      this.contatoService.update(this.id, this.contato).subscribe((result: any) => {
        this.toastrService.show("Contato alterado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
      }, error => {
        console.log(error);
      });
    } else {
      this.contatoService.create(this.contato).subscribe((result: any) => {
        this.toastrService.show("Contato cadastrado com sucesso!", "Sucesso!", this.config);
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

