import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ClienteService } from '../../../../@core/backend/common/services/cliente.service';
import { Cliente, ClienteAutoComplete, ReuniaoCliente } from '../../../../@core/interfaces/common/cliente';

import { Observable, of, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}


@Component({
  selector: 'ngx-add-reuniao-modal',
  templateUrl: './add-reuniao-modal.component.html',
  styleUrls: ['./add-reuniao-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClienteService]
})
export class AddReuniaoModalComponent implements OnInit {
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
  @Input() idCliente: number;
  @Input() reuniao: ReuniaoCliente;
  @Input() isFromDashboard: boolean = false; 

  // cliente auto complete
  clientes: ClienteAutoComplete[];
  cliente: Cliente;
  filteredCliente$: Observable<ClienteAutoComplete[]>;
  @ViewChild('clienteInput') clienteInput;

  reuniaoForm: FormGroup;
  refresh: Subject<any> = new Subject();

  constructor(protected ref: NbDialogRef<AddReuniaoModalComponent>,
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router,
    private toastrService: NbToastrService,
    private clienteService: ClienteService) {
  }

  get nome() { return this.reuniaoForm.get('nome'); }
  get descricao() { return this.reuniaoForm.get('descricao'); }
  get comeco() { return this.reuniaoForm.get('comeco'); }
  get fim() { return this.reuniaoForm.get('fim'); }
  get id() { return this.reuniaoForm.get('id'); }

  selectedDate: any;

  ngOnInit(): void {
    flatpickrFactory();
    this.initForm();
    this.loadClientes();
  }

  initForm() {
    this.reuniaoForm = this.fb.group({
      nome: this.fb.control(''),
      descricao: this.fb.control(''),
      comeco: this.fb.control(''),
      fim: this.fb.control(''),
      id: this.fb.control(''),
    });

    if (this.reuniao?.id) {
      this.reuniaoForm.setValue({
        id: this.reuniao.id,
        nome: this.reuniao.nome ? this.reuniao.nome : '',
        comeco: this.reuniao.comeco ? new Date(this.reuniao.comeco) : '',
        fim: this.reuniao.fim ? new Date(this.reuniao.fim) : '',
        descricao: this.reuniao.descricao ? this.reuniao.descricao : '',
      });
    }
  }

  loadClientes() {
    this.clienteService.getAllForAutocomplete(true)
      .pipe(debounceTime(500))
      .subscribe((res) => {
        this.clientes = res["body"];
        this.filteredCliente$ = of(this.clientes);
      });
  }

  save(): void {
    const reuniao: ReuniaoCliente = this.convertToReuniao(this.reuniaoForm.value);
    reuniao.idCliente = this.idCliente;
    if (this.reuniao?.id) {
      reuniao.id = this.reuniao?.id;
      this.clienteService.updateReuniao(this.reuniao?.id, reuniao).subscribe((result: any) => {
        this.toastrService.show("Reuniao alterado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
        this.clearForm();
      }, error => {
        console.log(error);
      });
    } else {
      this.clienteService.createReuniao(reuniao).subscribe((result: any) => {
        this.toastrService.show("Reuniao cadastrado com sucesso!", "Sucesso!", this.config);
        this.cd.detectChanges();
        this.dismiss();
        this.clearForm();
      }, error => {
        console.log(error);
      });
    }
  }

  dismiss() {
    this.ref.close();
  }

  convertToReuniao(value: any): ReuniaoCliente {
    const reuniao: ReuniaoCliente = value;
    return reuniao;
  }

  clearForm() {
    this.reuniaoForm = this.fb.group({
      id: this.fb.control(''),
      title: this.fb.control(''),
      start: this.fb.control(''),
      end: this.fb.control(''),
      color: this.fb.control(''),
      description: this.fb.control(''),
      idCliente: this.fb.control(''),
    });
  }

  flagClienteContactada() {
    this.clienteService.flagClienteContactada(this.idCliente)
      .subscribe(res => {
        this.toastrService.success("Empresa marcada como contactada com sucesso!", "Sucesso");
      }, error => {
        this.toastrService.warning("Não foi possível executar essa ação. Favor contactar o administrador.", "Error");
        console.log(error);
      });
  }

  // CLIENTE DROPDOWN 
  onClienteSelectionChange($event) {
    this.filteredCliente$ = this.getFilteredCliente($event.nome);
    this.idCliente = $event.id;
  }

  private filter(value: string): ClienteAutoComplete[] {
    let filterValue = "";
    if (value['id']) {
      filterValue = value['fullName'].toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.clientes.filter(optionValue => optionValue.nome.toLowerCase().includes(filterValue));
  }

  getFilteredCliente(value: string): Observable<ClienteAutoComplete[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  viewClienteHandle(value: any) {
    if (value['id']) {
      return value.nome;
    } else {
      return value;
    }
  }

  onClienteChange() {
    this.filteredCliente$ = this.getFilteredCliente(this.clienteInput.nativeElement.value);
  }
}

