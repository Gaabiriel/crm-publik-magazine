import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../users/user/user.component';
// import { AgenciaComponent } from './agencia/agencia.component';

import { CadastroComponent } from './cadastro.component';
import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import { ClienteNovoComponent } from './cliente/cliente-novo/cliente-novo.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent,
    children: [
      {
        path: 'cliente',
        component: ClienteListarComponent,
      },
      {
        path: 'cliente/edit/:id',
        // canActivate: [AdminGuard],
        component: ClienteNovoComponent,
      },
      {
        path: 'cliente/current',
        component: ClienteNovoComponent,
      },
      {
        path: 'cliente/add',
        // canActivate: [AdminGuard],
        component: ClienteNovoComponent,
      },
      // {
      //   path: 'agencia',
      //   component: AgenciaComponent,
      // },
      {
        path: 'usuario',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CadastroRoutingModule {
}


export const routedComponents = [
  CadastroComponent,
  ClienteListarComponent,
  ClienteNovoComponent,
];


