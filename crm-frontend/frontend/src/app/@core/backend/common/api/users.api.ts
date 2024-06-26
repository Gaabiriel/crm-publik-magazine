import { Injectable } from '@angular/core';
import { HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'users';

  constructor(private api: HttpService) { }

  get usersDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(this.apiController, { params })
      .pipe(map(data => data.map(item => {
        const picture = `${this.api.apiUrl}/${this.apiController}/${item.id}/photo`;
        return { ...item, picture };
      })));
  }

  getAll(): Observable<any> {
    return this.api.get(`${this.apiController}`);
  }

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current`)
      .pipe(map(data => {
        data = data["body"];
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        data = data["body"];
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/current`, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }

  uploadPhoto(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.api.post(`${this.apiController}/uploadPhoto`, file);

    // const req = new HttpRequest('POST', `${this.apiController}/uploadPhoto`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });

    // return this.http.request(req);
  }

}
