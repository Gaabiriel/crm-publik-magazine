import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbTokenService } from '@nebular/auth';
import { Cliente, ClienteData, ReuniaoCliente } from '../../../../@core/interfaces/common/cliente';
import { EMAIL_PATTERN } from '../../../../@auth/components';
import { DatePipe } from '@angular/common';
import { UsersService } from '../../../../@core/backend/common/services/users.service';
import { User } from '../../../../@core/interfaces/common/users';
import { UserStore } from '../../../../@core/stores/user.store';
import { ROLES } from '../../../../@auth/roles';
import { ProjetoService } from '../../../../@core/backend/common/services/projeto.service';
import { Projeto } from '../../../../@core/interfaces/common/projeto';
import { ContatoNovoComponent } from '../../contato/contato-novo/contato-novo.component';
import { PropostaNovoComponent } from '../../proposta/proposta-novo/proposta-novo.component';
import { ReuniaoNovoComponent } from '../../reuniao/reuniao-novo/reuniao-novo.component';

export enum ClienteFormMode {
  VIEW = 'Visualizar',
  EDIT = 'Alterar',
  ADD = 'Adicionar',
  EDIT_SELF = 'EditSelf',
}

@Component({
  selector: 'ngx-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.scss'],
  providers: [ProjetoService]
})
export class ClienteNovoComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  @Input() type: string = 'week';
  @ViewChild('usuariosCarteiraInput') usuariosCarteiraInput;
  @ViewChild(ContatoNovoComponent) contatoNovoComponent: ContatoNovoComponent;
  @ViewChild(PropostaNovoComponent) propostaNovoComponent: PropostaNovoComponent;
  @ViewChild(ReuniaoNovoComponent) reuniaoNovoComponent: ReuniaoNovoComponent;

  clienteForm: FormGroup;
  projetos: Projeto[];
  espacosRevista: any[];
  reunioes: ReuniaoCliente[];
  canAccessContatoTab: boolean = false;
  mode: ClienteFormMode;
  usuarios: User[];
  filteredUsuarios$: Observable<User[]>;
  isAdmin: boolean;
  userlogado: User;
  associadoOptions: any;
  perfilEmpresaOptions: any;
  accessReuniaoFromCalendar: boolean = false;

  get id() { return this.clienteForm.get('id'); }
  get nomeFantasia() { return this.clienteForm.get('nomeFantasia'); }
  get razaoSocial() { return this.clienteForm.get('razaoSocial'); }
  get cnpj() { return this.clienteForm.get('cnpj'); }
  get inscricaoEstadual() { return this.clienteForm.get('inscricaoEstadual'); }
  get telefoneFixo() { return this.clienteForm.get('telefoneFixo'); }
  get endereco() { return this.clienteForm.get('endereco'); }
  get cep() { return this.clienteForm.get('cep'); }
  get email() { return this.clienteForm.get('email'); }
  get site() { return this.clienteForm.get('site'); }
  get dataFundacao() { return this.clienteForm.get('dataFundacao'); }
  get projetoId() { return this.clienteForm.get('projetoId'); }
  get complemento() { return this.clienteForm.get('complemento'); }
  get cidade() { return this.clienteForm.get('cidade'); }
  get uf() { return this.clienteForm.get('uf'); }
  get associado() { return this.clienteForm.get('associado'); }
  get atualizado() { return this.clienteForm.get('atualizado'); }
  get usuarioId() { return this.clienteForm.get('usuarioId'); }
  get usuarioSelected() { return this.clienteForm.get('usuarioSelected'); }
  get perfilEmpresa() { return this.clienteForm.get('perfilEmpresa'); }


  constructor(
    private clientesService: ClienteData,
    private usuarioService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private fb: FormBuilder,
    private userStore: UserStore,
    private projetoService: ProjetoService) {
    this.userlogado = this.userStore.getUser()
    this.isAdmin = this.userlogado?.role?.name?.toLowerCase() === ROLES.ADMIN ? true : false;

    this.perfilEmpresaOptions = [
      { id: 1, value: "VIP" },
      { id: 2, value: "POTENCIAL" },
      { id: 4, value: "MEDIO" },
      { id: 5, value: "RENOVACAO" },
      { id: 6, value: "PEQUENO" }
    ];
  }

  selectTab($event: any): void {
    if ($event.tabTitle === "Contatos") {
      this.contatoNovoComponent.loadContatos();
    } else if ($event.tabTitle === "Propostas") {
      this.propostaNovoComponent.loadPropostas();
    } else if ($event.tabTitle === "Anotações das Reuniões") {
      this.reuniaoNovoComponent.loadReuniaoCliente();
    }
  }

  ngOnInit(): void {

    this.initClienteForm();
    this.loadProjetos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCliente(id);
      this.setViewMode(ClienteFormMode.EDIT)
      const visualizarReuniao = this.route.snapshot.queryParamMap.get('visualizarReuniao');
      if (Boolean(visualizarReuniao)) {
        this.accessReuniaoFromCalendar = true;
      }

    } else {
      if (!this.isAdmin) {
        this.loadUsuarios(this.userlogado.id);
      } else {
        this.loadUsuarios();
      }
      this.setViewMode(ClienteFormMode.ADD)
    }

  }

  ngAfterViewInit() {
    if (this.accessReuniaoFromCalendar) {
      this.reuniaoNovoComponent.loadReuniaoCliente();
    }
  }

  loadUsuarios(usuarioId?) {
    this.usuarioService.getAll()
      .subscribe((res) => {
        this.usuarios = res["body"];
        this.usuarios = this.usuarios.filter(x => x.fullName = x.firstName + " " + x.lastName);

        if (usuarioId) {
          let usuarioSelected = this.usuarios.find(x => x.id === usuarioId);
          this.usuariosCarteiraInput.nativeElement.value = usuarioSelected.fullName;
          this.onUsuariosSelectionChange(usuarioSelected);
        }

        this.filteredUsuarios$ = of(this.usuarios);
      });
  }

  initClienteForm() {
    this.clienteForm = this.fb.group({
      id: this.fb.control(''),
      nomeFantasia: this.fb.control(''),
      razaoSocial: this.fb.control(''),
      cnpj: this.fb.control(''),
      inscricaoEstadual: this.fb.control(''),
      telefoneFixo: this.fb.control(''),
      endereco: this.fb.control(''),
      cep: this.fb.control(''),
      email: this.fb.control('', [
        Validators.pattern(EMAIL_PATTERN),
      ]),
      site: this.fb.control(''),
      dataFundacao: this.fb.control(''),
      projetoId: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      inscricaoSocial: this.fb.control(''),
      complemento: this.fb.control(''),
      cidade: this.fb.control(''),
      uf: this.fb.control(''),
      associado: this.fb.control(''),
      atualizado: this.fb.control(''),
      usuarioId: this.fb.control(0),
      perfilEmpresa: this.fb.control(''),
    });
  }

  isEdit(): boolean {
    return this.mode === ClienteFormMode.EDIT ? true : false;
  }

  setViewMode(viewMode: ClienteFormMode) {
    this.mode = viewMode;
  }

  loadProjetos() {
    this.projetoService.getAll()
      .subscribe((res) => {
        this.projetos = res["body"];
      });
  }

  loadCliente(id?) {
    this.clientesService.getById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {

        let cliente = response["body"];

        this.clienteForm.setValue({
          id: cliente.id ? cliente.id : '',
          projetoId: cliente.projetoId ? cliente.projetoId : '',
          nomeFantasia: cliente.nomeFantasia ? cliente.nomeFantasia : '',
          razaoSocial: cliente.razaoSocial ? cliente.razaoSocial : '',
          cnpj: cliente.cnpj ? cliente.cnpj : '',
          inscricaoEstadual: cliente.inscricaoEstadual ? cliente.inscricaoEstadual : '',
          telefoneFixo: cliente.telefoneFixo ? cliente.telefoneFixo : '',
          endereco: cliente.endereco ? cliente.endereco : '',
          cep: cliente.cep ? cliente.cep : '',
          email: cliente.email ? cliente.email : '',
          site: cliente.site ? cliente.site : '',
          dataFundacao: cliente.dataFundacao ? new Date(cliente.dataFundacao) : '',
          inscricaoSocial: cliente.inscricaoSocial ? cliente.inscricaoSocial : '',
          complemento: cliente.complemento ? cliente.complemento : '',
          cidade: cliente.cidade ? cliente.cidade : '',
          uf: cliente.uf ? cliente.uf : '',
          associado: cliente.associado ? cliente.associado : '',
          atualizado: cliente.atualizado ? cliente.atualizado : '',
          usuarioId: cliente.usuarioId ? cliente.usuarioId : null,
          perfilEmpresa: cliente.perfilEmpresa ? cliente.perfilEmpresa : '',
        });

        if (cliente.usuarioId) {
          this.loadUsuarios(cliente.usuarioId);
        } else {
          this.loadUsuarios();
        }

        this.loadReuniaoCliente();
        this.canAccessContatoTab = true;
      });
  }

  convertToCliente(value: any): Cliente {
    const cliente: Cliente = value;
    return cliente;
  }

  save() {
    const cliente: Cliente = this.convertToCliente(this.clienteForm.value);
    debugger;
    // se é um cliente novo e se é o admin, nao precisa ir para aprovacao
    if (!this.isEdit() && this.isAdmin) {
      cliente.aprovado = true;
    } else // se é um cliente novo e se não é admin, precisa ir
      if (!this.isEdit() && !this.isAdmin) {
        cliente.aprovado = false;
      } else {
        cliente.aprovado = true;
      }

    if (this.isEdit()) {
      this.clientesService.update(cliente.id, cliente)
        .subscribe((result: any) => {
          this.handleSuccessResponse(result);
        },
          () => {
            this.handleWrongResponse();
          });
    } else {
      this.clientesService.create(cliente)
        .subscribe((result: any) => {
          this.handleSuccessResponse(result);
        },
          () => {
            this.handleWrongResponse();
          });
    }
  }

  enviarParaAprovacao() {
    const cliente: Cliente = this.convertToCliente(this.clienteForm.value);
    cliente.aprovado = false;
    this.clientesService.create(cliente)
      .subscribe(() => {
        this.toasterService.success('', `Cliente enviado para aprovação!`);
        this.back();
      },
        err => {
          console.log("Erro ao enviar para aprovação. Error: " + err);
          this.toasterService.danger('', `Erro ao enviar para aprovação! Tente novamente!`);
        });
  }

  handleSuccessResponse(result: any) {
    var cliente = result["body"];
    this.toasterService.success('', `Cliente ${this.mode === ClienteFormMode.ADD ? 'adicionado' : 'atualizado'}!`);
    this.clienteForm.controls['id'].setValue(cliente.id);
    this.canAccessContatoTab = true;
  }

  handleWrongResponse() {
    this.toasterService.danger('', `Erro ao cadastrar o cliente!`);
    this.canAccessContatoTab = false;
  }

  back() {
    this.router.navigate(["/pages/cadastro/cliente"]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  // ANOTACOES DAS REUNIOES 
  loadReuniaoCliente() {
    this.clientesService.getAllReuniaoCliente()
      .pipe(debounceTime(500))
      .subscribe((res) => {
        let result = res["body"];
        this.reunioes = result;
      });
  }
}

