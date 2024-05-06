import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastComponent, NbToastrService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { ClienteService } from '../../../@core/backend/common/services/cliente.service';
import { ButtonAprovarClienteComponent } from '../../ui-features/button-grid/button-aprovar-cliente.component';
import { ReuniaoCliente } from '../../../@core/interfaces/common/cliente';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../../../@core/backend/common/services/contato.service';
import { PropostaService } from '../../../@core/backend/common/services/proposta.service';
import { Projeto } from '../../../@core/interfaces/common/projeto';
import { ProjetoService } from '../../../@core/backend/common/services/projeto.service';

import { Observable, of } from 'rxjs';
import { User } from '../../../@core/interfaces/common/users';
import { map } from 'rxjs/operators';
import { UsersService } from '../../../@core/backend/common/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ngx-cliente-relatorio',
  templateUrl: './cliente-relatorio.component.html',
  styleUrls: ['./cliente-relatorio.component.scss'],
  providers: [ClienteService, ContatoService, PropostaService, ProjetoService, UsersService]
})
export class ClienteRelatorioComponent implements OnInit, OnDestroy {
  //Toast config
  status: NbComponentStatus = 'success';
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  }; 

  statusPropostaList = [
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


  perfilEmpresaOptions = [
    { id: 1, value: "VIP" },
    { id: 2, value: "POTENCIAL" },
    { id: 4, value: "MEDIO" },
    { id: 5, value: "RENOVACAO" },
    { id: 6, value: "PEQUENO" }
  ];
  loading = false;
  projetos: Projeto[];
  fields: any[];
  selectedFields: any;
  relatorioReuniaoForm: FormGroup;
  relatorioPropostaForm: FormGroup;
  relatorioClienteForm: FormGroup;
  reuniaoCliente: ReuniaoCliente[]
  usuarios: User[];
  filteredUsuarios$: Observable<User[]>;
  @ViewChild('usuariosCarteiraInput') usuariosCarteiraInput;

  get periodoReuniao() { return this.relatorioReuniaoForm.get('periodoReuniao'); }
  get usuarioId() { return this.relatorioReuniaoForm.get('usuarioId'); }
  get perfilEmpresa() { return this.relatorioReuniaoForm.get('perfilEmpresa'); }

  get selectedProjetoProposta() { return this.relatorioPropostaForm.get('selectedProjetoProposta'); }
  get periodoProposta() { return this.relatorioPropostaForm.get('periodoProposta'); }
  get statusProposta() { return this.relatorioPropostaForm.get('statusProposta'); }


  constructor(public accessChecker: NbAccessChecker,
    private clienteService: ClienteService,
    private projetoService: ProjetoService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private propostaService: PropostaService,
    private usuarioService: UsersService
  ) {
  }

  ngOnInit(): void { 
    this.loadProjetos();
    this.loadFields();
    this.loadUsuarios();

    this.relatorioReuniaoForm = this.fb.group({
      periodoReuniao: this.fb.control(''),
      usuarioId: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      perfilEmpresa: this.fb.control(''),
    });

    this.relatorioPropostaForm = this.fb.group({
      selectedProjetoProposta: this.fb.control(''),
      periodoProposta: this.fb.control(''),
      statusProposta: this.fb.control(''), 
    });
  }

  ngOnDestroy(): void {
  }

  loadUsuarios() {
    this.usuarioService.getAll()
      .subscribe((res) => {
        this.usuarios = res["body"];
        this.usuarios = this.usuarios.filter(x => x.fullName = x.firstName + " " + x.lastName);

        this.filteredUsuarios$ = of(this.usuarios);
      });
  } 

  loadProjetos() {
    this.projetoService.getAll()
      .subscribe((res) => {
        this.projetos = res["body"];
      });
  }

  loadFields() {
    this.clienteService.getRelatorioClienteFields()
      .subscribe((res) => {
        this.fields = res["body"];
      });
  }

  exportReuniao() {
    let start;
    let end;
    if (this.periodoReuniao.value) {
      start = this.periodoReuniao.value.start;
      end = this.periodoReuniao.value.end;
    }

    this.clienteService.getAllReuniaoByUsuarioId(start, end, this.usuarioId.value, this.perfilEmpresa.value)
      .subscribe(res => {
        this.reuniaoCliente = res['body'];
        if (this.reuniaoCliente.length === 0) {
          this.toasterService.warning('', `Nenhuma informação encontrada para esses filtros! Tente novamente!`);
          return;
        }

        /* table id is passed over here */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reuniaoCliente);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        var fileName = 'RelatorioReunioes_' + this.formatDateToName() + '.xlsx';
        XLSX.writeFile(wb, fileName);
      });
  }

  exportProposta() {
    let start;
    let end;
    if (this.periodoProposta.value) {
      start = this.periodoProposta.value.start;
      end = this.periodoProposta.value.end;
    }

    this.propostaService.getAllPropostaFiltered(start, end, this.selectedProjetoProposta.value, this.statusProposta.value)
      .subscribe(res => {
        this.reuniaoCliente = res['body'];
        if (this.reuniaoCliente.length === 0) {
          this.toasterService.warning('', `Nenhuma informação encontrada para esses filtros! Tente novamente!`);
          return;
        }

        /* table id is passed over here */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reuniaoCliente);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        var fileName = 'RelatorioPropostas_' + this.formatDateToName() + '.xlsx';
        XLSX.writeFile(wb, fileName);
      });
  }

  private formatDateToName() {
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (date + month + year + hours + minutes + seconds).toString();
  }

  // CARTEIRA  
  private filter(value: string): User[] {
    let filterValue = "";
    if (value['id']) {
      filterValue = value['fullName'].toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.usuarios.filter(optionValue => optionValue.fullName.toLowerCase().includes(filterValue));
  }

  getFilteredUsuarios(value: string): Observable<User[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  viewUsuariosHandle(value: any) {
    if (value['id']) {
      return value.fullName;
    } else {
      return value;
    }
  }

  onUsuariosChange() {
    this.filteredUsuarios$ = this.getFilteredUsuarios(this.usuariosCarteiraInput.nativeElement.value);
  }

  onUsuariosSelectionChange($event) {
    this.filteredUsuarios$ = this.getFilteredUsuarios($event.fullName);
    this.usuarioId.setValue($event.id);
  }
}

