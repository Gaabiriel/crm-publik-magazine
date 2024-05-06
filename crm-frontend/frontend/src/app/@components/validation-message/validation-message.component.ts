import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-validation-message',
  styleUrls: ['./validation-message.component.scss'],
  template: `
      <div class="warning">
          <span class="caption status-danger"
             *ngIf="showMinLength"> Valor mínimo do campo {{ label }} é {{ minLength }}</span>
          <span class="caption status-danger"
             *ngIf="showMaxLength"> Valor máximo do campo {{ label }} é {{ maxLength }}</span>
          <span class="caption status-danger" *ngIf="showPattern">  {{ label }} Incorreto </span>
          <span class="caption status-danger" *ngIf="showRequired"> {{ label }} é obrigatório</span>
          <span class="caption status-danger" *ngIf="showMin">Valor mínimo do {{ label }} é {{ min }}</span>
          <span class="caption status-danger" *ngIf="showMax">Valor máximo do {{ label }} é {{ max }}</span>
      </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxValidationMessageComponent),
      multi: true,
    },
  ],
})
export class NgxValidationMessageComponent {
  @Input()
  label: string = '';

  @Input()
  showRequired?: boolean;

  @Input()
  min?: number;

  @Input()
  showMin?: boolean;

  @Input()
  max?: number;

  @Input()
  showMax: boolean;

  @Input()
  minLength?: number;

  @Input()
  showMinLength?: boolean;

  @Input()
  maxLength?: number;

  @Input()
  showMaxLength?: boolean;

  @Input()
  showPattern?: boolean;
}
