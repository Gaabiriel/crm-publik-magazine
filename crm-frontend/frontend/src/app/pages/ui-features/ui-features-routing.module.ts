import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiFeaturesComponent } from './ui-features.component';

const routes: Routes = [{
  path: '',
  component: UiFeaturesComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiFeaturesRoutingModule { }
