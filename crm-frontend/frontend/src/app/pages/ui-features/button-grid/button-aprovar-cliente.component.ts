import { ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ClienteService } from '../../../@core/backend/common/services/cliente.service';
import { ProjetoService } from '../../../@core/backend/common/services/projeto.service';
import { ClienteData } from '../../../@core/interfaces/common/cliente';
import { ClienteVisualizarComponent } from '../../cadastro/cliente/cliente-visualizar/cliente-visualizar.component';

@Component({
  selector: 'ngx-button-aprovar-cliente',
  templateUrl: 'button-aprovar-cliente.component.html',
  styleUrls: ['button-aprovar-cliente.component.scss'],
  providers: [ClienteService, ProjetoService]
})
export class ButtonAprovarClienteComponent implements ViewCell {

  //Toast config
  status: NbComponentStatus = 'success';
  config = {
    status: this.status,
    destroyByClick: true,
    duration: 2000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() onAprovadoEmitter: EventEmitter<any> = new EventEmitter();
  loading = false;

  constructor(protected cd: ChangeDetectorRef, private dialogService: NbDialogService, private clienteService: ClienteData, private toastrService: NbToastrService,) {
  }

  onClickVisualizar() {
    this.dialogService.open(ClienteVisualizarComponent, {
      context: {
        idCliente: this.rowData.id,
      },
    });
  }


  onClickAprovar(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: {
          title: 'Você tem certeza que deseja aprovar esse cliente?',
          id: this.rowData.id
        }
      }
    );
  }

  onAprovar() {
    this.loading = true;
    this.clienteService.aprovarCliente(this.rowData.id)
      .subscribe((res) => {
        this.loading = false;
        this.toastrService.show("Cliente aprovado com sucesso!", "Sucesso!", this.config);
        this.onAprovadoEmitter.emit(true);
      });
  }
}