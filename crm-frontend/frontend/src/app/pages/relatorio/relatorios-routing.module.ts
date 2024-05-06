import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteRelatorioComponent } from './cliente-relatorio/cliente-relatorio.component';
import { RelatoriosComponent } from './relatorios.component';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosComponent,
    children: [
      {
        path: 'clienterelatorio',
        component: ClienteRelatorioComponent,
      }
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
export class RelatoriosRoutingModule {
}


export const routedComponents = [
  RelatoriosComponent,
  ClienteRelatorioComponent,
];


