import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../@auth/admin.guard';
import { AdministracaoComponent } from './administracao.component';
import { ClienteAprovarListarComponent } from './cliente-aprovar-listar/cliente-aprovar-listar.component';
import { ProjetoListarComponent } from './projeto/projeto-listar/projeto-listar.component';
import { ProjetoNovoComponent } from './projeto/projeto-novo/projeto-novo.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioNovoComponent } from './usuario/usuario-novo/usuario-novo.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracaoComponent,
    children: [
      {
        path: 'usuario',
        component: UsuarioListarComponent,
      },
      {
        path: 'usuario/edit/:id',
        canActivate: [AdminGuard],
        component: UsuarioNovoComponent,
      },
      {
        path: 'usuario/current',
        component: UsuarioNovoComponent,
      },
      {
        path: 'usuario/add',
        canActivate: [AdminGuard],
        component: UsuarioNovoComponent,
      },
      {
        path: 'clienteaprovar',
        component: ClienteAprovarListarComponent,
      }, {
        path: 'projeto',
        component: ProjetoListarComponent,
      },
      {
        path: 'projeto/edit/:id',
        canActivate: [AdminGuard],
        component: ProjetoNovoComponent,
      },
      {
        path: 'projeto/add',
        canActivate: [AdminGuard],
        component: ProjetoNovoComponent,
      },
      // {
      //   path: 'contato',
      //   component: ContatoComponent,
      // },
      // {
      //   path: 'autorizante',
      //   component: ClienteComponent,
      // },
      // {
      //   path: 'financeiro',
      //   component: ClienteComponent,
      // },
      // {
      //   path: 'usuario',
      //   component: UserComponent,
      // },
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
export class AdministracaoRoutingModule {
}


export const routedComponents = [
  AdministracaoComponent,
  UsuarioListarComponent,
  UsuarioNovoComponent,
  ProjetoNovoComponent,
  ProjetoListarComponent
];


