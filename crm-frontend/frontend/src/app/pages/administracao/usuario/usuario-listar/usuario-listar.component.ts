import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { UsersService } from '../../../../@core/backend/common/services/users.service';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss'],
  providers: [UsersService]
})
export class UsuarioListarComponent {
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
    noDataMessage: 'Nenhum usuário encontrado.',
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
      addButtonContent: '<i class="nb-plus" (click)="addUsuario()"></i>',
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
      firstName: {
        title: 'Nome',
        type: 'string',
      },
      lastName: {
        title: 'Sobrenome',
        type: 'string',
      },
      // login: {
      //   title: 'Login',
      //   type: 'string',
      // },
      email: {
        title: 'Email',
        type: 'string',
      },
      telefoneFixo: {
        title: 'Telefone',
        type: 'string',
      },
      celular: {
        title: 'Celular',
        type: 'string',
      }
    },
  };

  settingsView = {
    noDataMessage: 'Nenhum usuário encontrado.',
    mode: 'external',
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right'
    },
    rowClassFunction: (row) => {
      return 'display: none;';
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        width: '10px'
      },
      firstName: {
        title: 'Nome',
        type: 'string',
      },
      lastName: {
        title: 'Sobrenome',
        type: 'string',
      },
      // login: {
      //   title: 'Login',
      //   type: 'string',
      // },
      email: {
        title: 'Email',
        type: 'string',
      },
      telefoneFixo: {
        title: 'Telefone',
        type: 'string',
      },
      celular: {
        title: 'Celular',
        type: 'string',
      }
    },
  };

  constructor(public accessChecker: NbAccessChecker, private usuarioService: UsersService, private dialogService: NbDialogService, private toastrService: NbToastrService, private router: Router) {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getAll()
      .subscribe((res) => {
        this.source.load(res["body"]);
      });
  }

  onEditRowSelect(event): void {
    this.router.navigate(["/pages/administracao/usuario/edit/", event.data.id]);
  }

  onCreateRowSelect(event): void {
    this.router.navigate(["/pages/administracao/usuario/add"]);
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
    this.usuarioService.delete(id)
      .subscribe((res) => {
        this.toastrService.show("Usuario excluido com sucesso!", "Sucesso!", this.config);
        this.loadUsuarios();
      }, error => {

      });
  }



}
