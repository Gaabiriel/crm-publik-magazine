import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { UserData, User } from '../../../interfaces/common/users';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { switchMap, map } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class UsersService extends UserData {

  constructor(private api: UsersApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.usersDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return this.api.list(pageNumber, pageSize);
  }

  getAll(): any {
    return this.api.getAll();
  }

  getCurrentUser(): Observable<User> {
    return this.authService.isAuthenticated()
      .pipe(
        switchMap(authenticated => {
          return authenticated ? this.api.getCurrent() : of(null);
        }),
        map(u => {
          if (u && !u.setting) {
            u.setting = {};
          }
          return u;
        }));
  }

  get(id: number): Observable<User> {
    return this.api.get(id);
  }

  create(user: any): Observable<User> {
    return this.api.add(user);
  }

  update(user: any): Observable<User> {
    return this.api.update(user);
  }

  updateCurrent(user: any): Observable<User> {
    return this.api.updateCurrent(user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

  uploadPhoto(file: File): Observable<HttpEvent<any>> {
    return this.api.uploadPhoto(file);
  }
}
