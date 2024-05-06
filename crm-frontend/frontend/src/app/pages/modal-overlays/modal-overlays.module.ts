import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbToggleModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';

// modules
import { ThemeModule } from '../../@theme/theme.module';
import { ModalOverlaysRoutingModule } from './modal-overlays-routing.module';

// components
import { ModalOverlaysComponent } from './modal-overlays.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';

import { ImportarClienteComponent } from './dialog/importar-cliente/importar-cliente.component';
import { AddContatoModalComponent } from './dialog/add-contato/add-contato-modal.component';
import { AddPropostaModalComponent } from './dialog/add-proposta/add-proposta-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ShowcaseDialogComponent } from './dialog/showcase-dialog/showcase-dialog.component';
import { AddProjetoModalComponent } from './dialog/add-projeto/add-projeto-modal.component';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { eo } from 'date-fns/locale';
import { AddReuniaoModalComponent } from './dialog/add-reuniao/add-reuniao-modal.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import 'flatpickr/dist/flatpickr.css';
import { CalendarModule, DateAdapter } from 'angular-calendar';

const COMPONENTS = [
  ModalOverlaysComponent,
  DialogComponent,
  AddContatoModalComponent,
  AddPropostaModalComponent,
  DialogNamePromptComponent,
  ImportarClienteComponent,
  ShowcaseDialogComponent,
  AddProjetoModalComponent,
  AddReuniaoModalComponent
];

const ENTRY_COMPONENTS = [
  AddContatoModalComponent,
  AddPropostaModalComponent,
  DialogNamePromptComponent,
  ImportarClienteComponent,
  ShowcaseDialogComponent,
  AddProjetoModalComponent,
  AddReuniaoModalComponent
];

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  ThemeModule,
  ModalOverlaysRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
  NbActionsModule,
  NbCardModule,
  NbDatepickerModule,
  NbAutocompleteModule,
  NbDateFnsDateModule.forRoot({
    parseOptions: { locale: eo },
    formatOptions: { locale: eo },
    format: 'dd.MM.yyyy'
  }),
  NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' }),
  NbMomentDateModule,
  NbMomentDateModule,
  NbSpinnerModule,
  Ng2SmartTableModule,
  NbToggleModule,
  NbRadioModule,
  FlatpickrModule.forRoot(),
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }),
];

const SERVICES = [
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalOverlaysModule {
}
