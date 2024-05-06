import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-button-grid',
  template: `
  <button (click)="onClick()" nbbutton="" status="info" tabindex="0" class="appearance-hero size-medium status-primary shape-rectangle nb-transition">Visualizar Descrição</button>
 `,
})
export class ButtonGridComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: NbDialogService) {

  }


  onClick() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        body: this.rowData.descricao,
      },
    });
  }

}