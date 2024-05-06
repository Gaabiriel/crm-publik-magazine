import { NgModule } from '@angular/core';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbTooltipModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { ButtonGridComponent } from './button-grid/button-grid.component';
import { AuthModule } from '../../@auth/auth.module';
import { ButtonAprovarClienteComponent } from './button-grid/button-aprovar-cliente.component';

const components = [
  UiFeaturesComponent,
  ButtonGridComponent,
  ButtonAprovarClienteComponent
];

@NgModule({
  imports: [
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    UiFeaturesRoutingModule,
    NbTooltipModule,
    AuthModule.forRoot(),
    NbButtonModule
  ],
  declarations: [
    ...components,
  ],
})
export class UiFeaturesModule { }
