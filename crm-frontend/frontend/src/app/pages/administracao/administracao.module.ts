import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthModule } from '../../@auth/auth.module';
import { ComponentsModule } from '../../@components/components.module';
import { MeasureConverterPipe } from '../../@theme/pipes';

import { ThemeModule } from '../../@theme/theme.module';
import { AdministracaoRoutingModule, routedComponents } from './administracao-routing.module';
import { ClienteAprovarListarComponent } from './cliente-aprovar-listar/cliente-aprovar-listar.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioNovoComponent } from './usuario/usuario-novo/usuario-novo.component';

const NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
];
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    AdministracaoRoutingModule,
    NbSelectModule,
    AuthModule,
    NbIconModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    ...routedComponents,
    UsuarioListarComponent,
    UsuarioNovoComponent,
    ClienteAprovarListarComponent
  ],
  providers: [
    MeasureConverterPipe,
  ],
})
export class AdministracaoModule { }
