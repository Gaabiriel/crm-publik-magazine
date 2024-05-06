import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { getDeepFromObject, NbAuthOAuth2JWTToken, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { User, UserData } from '../../../../@core/interfaces/common/users';
import { UserStore } from '../../../../@core/stores/user.store';
import { EMAIL_PATTERN, NUMBERS_PATTERN } from '../../../../@auth/components';
import { PerfilService } from '../../../../@core/backend/common/services/perfil.service';
import { Perfil } from '../../../../@core/interfaces/common/perfil';

export enum UserFormMode {
  VIEW = 'Visualizar',
  EDIT = 'Editar',
  ADD = 'Adicionar',
  EDIT_SELF = 'Se editando',
}

@Component({
  selector: 'ngx-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.scss'],
  providers: [PerfilService]
})
export class UsuarioNovoComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  perfis: Perfil[];

  @Input() type: string = 'week';
  protected readonly unsubscribe$ = new Subject<void>();
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');

  get firstName() { return this.userForm.get('firstName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get email() { return this.userForm.get('email'); }

  get telefoneFixo() { return this.userForm.get('telefoneFixo'); }

  get celular() { return this.userForm.get('celular'); }

  get regiao() { return this.userForm.get('regiao'); }

  get roleId() { return this.userForm.get('roleId'); }
  get password() { return this.userForm.get('password'); }
  get login() { return this.userForm.get('login'); }

  mode: UserFormMode;
  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {},
    private usersService: UserData,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: NbTokenService,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private fb: FormBuilder,
    private perfilService: PerfilService) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserData();
    this.perfilService.getAll()
      .subscribe((res) => {
        this.perfis = res["body"];
      });
  }

  initUserForm() {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.userForm = this.fb.group({
      id: this.fb.control(''),
      role: this.fb.control(''),
      roleId: this.fb.control(''),
      firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      login: this.fb.control(''),
      // age: this.fb.control('', [Validators.required, Validators.min(1),
      // Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      // address: this.fb.group({
      //   street: this.fb.control(''),
      //   city: this.fb.control(''),
      //   zipCode: this.fb.control(''),
      // }),
      telefoneFixo: this.fb.control(''),
      celular: this.fb.control(''),
      regiao: this.fb.control(''),
      password: this.fb.control('', [Validators.required]),
    });
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }


  loadUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    const isProfile = this.route.snapshot.queryParamMap.get('profile');
    if (isProfile) {
      this.setViewMode(UserFormMode.EDIT_SELF);
      this.loadUser();
    } else {
      if (id) {
        const currentUserId = this.userStore.getUser().id;
        this.setViewMode(currentUserId.toString() === id ? UserFormMode.EDIT_SELF : UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.ADD);
      }
    }
  }

  loadUser(id?) {
    this.usersService.get(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userForm.setValue({
          id: user.id ? user.id : '',
          role: user.role ? user.role : '',
          roleId: user.roleId ? user.roleId : '',
          firstName: user.firstName ? user.firstName : '',
          lastName: user.lastName ? user.lastName : '',
          email: user.email,
          // address: {
          //   street: (user.address && user.address.street) ? user.address.street : '',
          //   city: (user.address && user.address.city) ? user.address.city : '',
          //   zipCode: (user.address && user.address.zipCode) ? user.address.zipCode : '',
          // },
          telefoneFixo: user.telefoneFixo ? user.telefoneFixo : '',
          celular: user.celular ? user.celular : '',
          regiao: user.regiao ? user.regiao : '',
          password: user.password ? user.password : '',
          login: user.login ? user.login : ''
        });

        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }


  convertToUser(value: any): User {
    const user: User = value;
    return user;
  }

  save() {
    const user: User = this.convertToUser(this.userForm.value);

    let observable = new Observable<User>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      this.usersService.updateCurrent(user).subscribe((result: any) => {
        this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
        this.handleSuccessResponse();
      },
        err => {
          this.handleWrongResponse();
        });
    } else {
      observable = user.id
        ? this.usersService.update(user)
        : this.usersService.create(user);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.handleSuccessResponse();
      },
        err => {
          this.handleWrongResponse();
        });
  }

  handleSuccessResponse() {
    this.toasterService.success('', `Usuário ${this.mode === UserFormMode.ADD ? 'adicionado' : 'atualizado'}!`);
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', `Esse e-mail já está sendo usado!`);
  }

  back() {
    this.router.navigate(["/pages/administracao/usuario"]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
