import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions } from "./users-store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { UsersService } from "@app/_pages/users/users.service";
import { selectAllUsers } from "./users-selector";

@Injectable()
export class UsersEffects {
  constructor(
    private action$: Actions,
    private usersService: UsersService
  ) {}

  loadInitialUsers = createEffect(() => this.action$.pipe(
        ofType(UsersActions.init),
        switchMap(() => this.usersService.getUserList().pipe(
            tap((res) => {
                localStorage.setItem('users', JSON.stringify(res));
            }),
            map(users => UsersActions.saveInitialUsers({ users: users }))
        ))
    ));

  saveUsers = createEffect(() => this.action$.pipe(
    ofType(UsersActions.addUser, UsersActions.deleteUser, UsersActions.updateUser),
    withLatestFrom(selectAllUsers),
    tap((users) => {
        localStorage.setItem('users', JSON.stringify(users));
    })
  ), {dispatch: false});
}