import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Settings } from './settings';
import { HttpEvent } from '@angular/common/http';
import * as internal from 'assert';

export interface User {
  id: number;
  role: Role;
  roleId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  name?: string;
  telefoneFixo?: string;
  celular?: string;
  regiao?: string;
  age: number;
  login: string;
  picture: string;
  address: Address;
  settings: Settings;
  password: string;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Role {
  id: number;
  name: string;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;
  abstract getCurrentUser(): Observable<User>;
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract updateCurrent(user: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
  abstract uploadPhoto(file: File): Observable<HttpEvent<any>>;
}
