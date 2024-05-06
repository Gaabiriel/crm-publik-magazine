import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UploadApi {
    private readonly apiController: string = 'cliente';

    constructor(private api: HttpService) { }

    importarClientes(formData: FormData, projetoId: number, isAdmin: boolean): Observable<any> {
        let headers = new HttpHeaders();

        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const httpOptions = { headers: headers };

        return this.api.post(`${this.apiController}/ImportarClientesAsync/${projetoId}/${isAdmin}`, formData, httpOptions);
    }
}