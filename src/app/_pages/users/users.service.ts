import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_state/users/users-store';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
@Injectable()
export class UsersService {

  constructor(
    private _httpClient:HttpClient
  ) { }

  getUserList(): Observable<User[]> {
    return this._httpClient.get<any>(environment.api + '/user').pipe(
      map((res) => res.users.map((item: User) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        maidenName: item.maidenName,
        age: item.age,
        gender: item.gender,
        email: item.email,
        phone: item.phone,
        birthDate: item.birthDate,
        show: false,
      }))),
    )
  }
}
