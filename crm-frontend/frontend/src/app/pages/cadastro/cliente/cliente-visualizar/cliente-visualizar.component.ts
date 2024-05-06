import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { map, takeUntil } from 'rxjs/operators';

import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';

import { NbTokenService } from '@nebular/auth';
import { Cliente, ClienteData } from '../../../../@core/interfaces/common/cliente';
import { EMAIL_PATTERN } from '../../../../@auth/components';
import { Contato, ContatoData } from '../../../../@core/interfaces/common/contato';
import { PropostaData } from '../../../../@core/interfaces/common/proposta';
import { UsersService } from '../../../../@core/backend/common/services/users.service';
import { User } from '../../../../@core/interfaces/common/users';
import { UserStore } from '../../../../@core/stores/user.store';
import { Projeto } from '../../../../@core/interfaces/common/projeto';
import { ProjetoService } from '../../../../@core/backend/common/services/projeto.service';

@Component({
  selector: 'ngx-cliente-visualizar',
  templateUrl: './cliente-visualizar.component.html',
  styleUrls: ['./cliente-visualizar.component.scss'],
  providers: [ProjetoService]
})
export class ClienteVisualizarComponent implements OnInit, OnDestroy {
  @Input() idCliente: number;
  clienteForm: FormGroup;
  projetos: Projeto[];
  @Input() type: string = 'week';
  protected readonly unsubscribe$ = new Subject<void>();
  usuarios: User[];
  filteredUsuarios$: Observable<User[]>;
  @ViewChild('usuariosCarteiraInput') usuariosCarteiraInput;

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

  constructor(protected ref: NbDialogRef<ClienteVisualizarComponent>,
    private clientesService: ClienteData,
    private usuarioService: UsersService,
    private fb: FormBuilder,
    private projetoService: ProjetoService) {
  }


  ngOnInit(): void {
    this.initClienteForm();
    this.loadProjetos();
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
      usuarioId: this.fb.control(null),
    });
  }

  loadProjetos() {
    this.projetoService.getAll()
      .subscribe((res) => {
        this.projetos = res["body"];
        this.loadUsuarios();
      });
  }

  loadUsuarios() {
    this.usuarioService.getAll()
      .subscribe((res) => {
        this.usuarios = res["body"];
        this.usuarios = this.usuarios.filter(x => x.fullName = x.firstName + " " + x.lastName);
        this.loadCliente(this.idCliente);
      });
  }

  loadCliente(id?) {
    this.clientesService.getById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        let cliente = response["body"];
        const projeto = this.projetos.find(x => x.id === cliente.projetoId);
        const usuario = this.usuarios.find(x => x.id === cliente.usuarioId);

        this.clienteForm.setValue({
          id: cliente.id ? cliente.id : '',
          projetoId: projeto ? projeto.nome : '',
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
          usuarioId: usuario ? usuario.firstName : null,
        });

      });
  }

  back() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

