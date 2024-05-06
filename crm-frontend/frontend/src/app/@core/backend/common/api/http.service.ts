import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable()
export class HttpService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  getServerDataSource(uri: string): ServerDataSource {
    return new ServerDataSource(this.http,
      {
        endPoint: uri,
        totalKey: 'totalRecords',
        dataKey: 'data',
        pagerPageKey: 'pageNumber',
        pagerLimitKey: 'pageSize',
        filterFieldKey: '#field#',
        sortFieldKey: 'sortBy',
        sortDirKey: 'orderBy', 
      });
  }

  get(endpoint: string, options?, params?): Observable<any> {
    // return this.http.get(`${this.apiUrl}/${endpoint}`, options);
    return this.http.get(`${this.apiUrl}/${endpoint}`, { observe: 'response' });
  }

  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { observe: 'response' });
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { observe: 'response' });
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { observe: 'response' });
  }
}
