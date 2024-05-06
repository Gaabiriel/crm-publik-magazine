import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ROLES } from '../../../../@auth/roles';
import { ProjetoService } from '../../../../@core/backend/common/services/projeto.service';
import { UploadService } from '../../../../@core/backend/common/services/upload.service';
import { Projeto } from '../../../../@core/interfaces/common/projeto';
import { UserStore } from '../../../../@core/stores/user.store';

@Component({
  selector: 'ngx-importar-cliente',
  templateUrl: 'importar-cliente.component.html',
  styleUrls: ['importar-cliente.component.scss'],
  providers: [ProjetoService]
})
export class ImportarClienteComponent {
  @ViewChild('fileInput') fileInput;
  message: string;
  projetos: Projeto[];
  projetoId: any;
  fileName: any;
  fileExtension: any;
  canImport: boolean = false;
  loading = false;
  isAdmin = false;

  constructor(
    protected ref: NbDialogRef<ImportarClienteComponent>,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private projetoService: ProjetoService,
    private toasterService: NbToastrService,
    private userStore: UserStore) {
    let user = this.userStore.getUser();
    this.isAdmin = user?.role?.name?.toLowerCase() === ROLES.ADMIN ? true : false;
  }

  ngOnInit(): void {
    this.canImport = true;
    this.projetoService.getAll()
      .subscribe((res) => {
        this.projetos = res["body"];
      })
  }

  cancel() {
    this.ref.close();
  }

  uploadFile() {
    if (!this.projetoId) {
      this.toasterService.warning('', `Selecione um projeto para continuar!`);
      return;
    }

    let file = this.fileInput.nativeElement.files[0];

    if (!file) {
      this.toasterService.warning('', `Falha ao carregar o arquivo, por favor tente novamente!`);
      return;
    }

    this.fileName = file.name;

    var allowedExtensions =
      ["xls", "csv", "xlsx"];
    this.fileExtension = this.fileName.split('.').pop();

    if (!this.isInArray(allowedExtensions, this.fileExtension)) {
      this.toasterService.warning('', `Somente arquivos excel permitidos!`);
      return;
    }

    let formData = new FormData();
    formData.append('upload', file);

    this.loading = true;
    this.uploadService.importarClientes(formData, this.projetoId, this.isAdmin)
      .subscribe(result => {
        this.message = result["body"];
        if (result.status == 200) {
          this.toasterService.success('', this.message);
        } else if (result.status == 500) {
          this.toasterService.warning('', this.message);
        }
        this.ref.close(this.message);
        this.loading = false;
      }, error => {
        this.loading = false;
        this.ref.close(this.message);
        this.toasterService.warning("Erro ao importar clientes, favor contactar o administrador!");
      });
  }

  /*- checks if word exists in array -*/
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }


}