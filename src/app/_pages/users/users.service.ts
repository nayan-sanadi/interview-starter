import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_state/users/users-store';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class UsersService {

  constructor(
    private _httpClient:HttpClient
  ) { }

  getUserList():Observable<any>
  {
    return this._httpClient.get<User>(environment.api+'/user');
  }
}
