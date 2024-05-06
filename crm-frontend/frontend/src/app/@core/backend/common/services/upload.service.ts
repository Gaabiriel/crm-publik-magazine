import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadData } from '../../../interfaces/common/upload';
import { UploadApi } from '../api/upload.api';

@Injectable()
export class UploadService extends UploadData {
    constructor(private api: UploadApi) {
        super();
    }
    z
    importarClientes(formData: FormData, projetoId: number, isAdmin: boolean): Observable<any> {
        return this.api.importarClientes(formData, projetoId, isAdmin);
    }
}
