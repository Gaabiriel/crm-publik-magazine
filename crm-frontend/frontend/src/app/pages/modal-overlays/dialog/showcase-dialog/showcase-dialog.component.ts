import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {
  radioGroupValue: any;
  @Input() body: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) { }

  dismiss() {
    this.ref.close();
  }
}
