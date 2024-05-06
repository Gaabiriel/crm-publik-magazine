import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { RelatoriosRoutingModule, routedComponents } from './relatorios-routing.module';
import { ClienteRelatorioComponent } from './cliente-relatorio/cliente-relatorio.component';
import { NbMomentDateModule } from '@nebular/moment';

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
    RelatoriosRoutingModule,
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
    AuthModule,
    NbIconModule,
    ComponentsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    ...NB_MODULES,
  ],
  declarations: [
    ...routedComponents,
    ClienteRelatorioComponent
  ],
  providers: [
    MeasureConverterPipe,
  ],
})
export class RelatoriosModule { }
