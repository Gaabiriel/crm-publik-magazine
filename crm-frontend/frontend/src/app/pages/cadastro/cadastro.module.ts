import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAutocompleteModule,
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
  NbTooltipModule,
  NbTreeGridModule,
  NbUserModule,
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthModule } from '../../@auth/auth.module';
import { ComponentsModule } from '../../@components/components.module';
import { MeasureConverterPipe } from '../../@theme/pipes';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, CadastroRoutingModule } from '../cadastro/cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import { ClienteNovoComponent } from './cliente/cliente-novo/cliente-novo.component';
import { ClienteVisualizarComponent } from './cliente/cliente-visualizar/cliente-visualizar.component';
import { ContatoNovoComponent } from './contato/contato-novo/contato-novo.component';
import { PropostaNovoComponent } from './proposta/proposta-novo/proposta-novo.component';
import { ReuniaoNovoComponent } from './reuniao/reuniao-novo/reuniao-novo.component';

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
  NbMomentDateModule,
  NbAutocompleteModule,
  NbTooltipModule,
  NbAccordionModule
];
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CadastroRoutingModule,
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
    CadastroRoutingModule,
    NbSelectModule,
    AuthModule,
    NbIconModule,
    ComponentsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    ...NB_MODULES,
  ],
  declarations: [
    ...routedComponents,
    CadastroComponent,
    ClienteListarComponent,
    ClienteNovoComponent,
    ClienteVisualizarComponent,
    ContatoNovoComponent,
    PropostaNovoComponent,
    ReuniaoNovoComponent
  ],
  providers: [
    MeasureConverterPipe,
  ],
})
export class CadastroModule { }
