import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UsersActions } from '@app/_state/users/users-store';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { Observable, map, tap } from 'rxjs';
@Injectable()
export class UsersService {

  constructor(
    private _httpClient:HttpClient,
    private _store:Store
  ) { }

  getUserList():Observable<any>
  {
    return this._httpClient.get<any>(environment.api + '/users')
            .pipe(
                map((response) => this.mapToUser(response.users)),
                tap((response) => {
                  this._store.dispatch(UsersActions.saveInitialUsers({users: response}))
                })
            );
  }

  private mapToUser = (data: any[]): User[] => {
    return data.map(item => ({
      id: item.id.toString(),
      firstName: item.firstName,
      lastName: item.lastName,
      maidenName: item.maidenName,
      age: item.age,
      gender: item.gender,
      email: item.email,
      phone: item.phone,
      birthDate: item.birthDate,
      show: false
    }));
  }
}
