import { NbMenuItem } from '@nebular/theme';
import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserStore } from '../@core/stores/user.store';
import { User } from '../@core/interfaces/common/users';
import { ROLES } from '../@auth/roles';

@Injectable()
export class PagesMenu {
  private destroy$: Subject<void> = new Subject<void>();
  user: User;

  constructor(private userStore: UserStore) {

  }

  getMenu(): Observable<NbMenuItem[]> {

    this.user = this.userStore.getUser()

    const dashboardMenu: NbMenuItem[] = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/pages/dashboard',
        home: true,
        children: undefined,
      }
    ];

    const featuresMenu: NbMenuItem[] = [
      {
        title: 'Clientes',
        icon: 'people-outline',
        link: '/pages/cadastro/cliente',
      },

    ];
    const relatorioMenu: NbMenuItem[] = [
      {
        title: 'Relatórios',
        icon: 'printer-outline',
        children: [
          {
            title: 'Cliente',
            link: '/pages/relatorio/clienterelatorio',
          }
        ],
      }
    ]
    const admMenu: NbMenuItem[] = [
      {
        title: 'Administração',
        icon: 'layout-outline',
        children: [
          {
            title: 'Usuarios',
            link: '/pages/administracao/usuario',
          },
          {
            title: 'Clientes Para Aprovação',
            link: '/pages/administracao/clienteaprovar',
          },
          {
            title: 'Projetos',
            link: '/pages/administracao/projeto',
          },
          // {
          //   title: 'Configurações',
          //   link: '/pages/layout/infinite-list',
          // }
        ],
        hidden: this.user?.role?.name?.toLowerCase() != ROLES.ADMIN ? true : false
      }
    ];


    const authMenu: NbMenuItem[] = [
      {
        title: 'Authenticação',
        icon: 'lock-outline',
        children: [
          {
            title: 'Login',
            link: '/auth/login',
          },
          {
            title: 'Registrar',
            link: '/auth/register',
          },
          {
            title: 'Requisitar Senha',
            link: '/auth/request-password',
          },
          {
            title: 'Resetar Senha',
            link: '/auth/reset-password',
          },
        ],
      },
    ];

    return of([...dashboardMenu, ...featuresMenu, ...relatorioMenu, ...admMenu]);
  }

}
