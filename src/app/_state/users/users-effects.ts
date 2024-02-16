import { Injectable, inject } from "@angular/core";
import { UsersService } from "@app/_pages/users/users.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, tap } from "rxjs";
import { UsersActions } from "./users-store";

@Injectable()
export class UsersEffects {
    
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) { }

    initUsers = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.init),
        switchMap(() => this.usersService.getUserList().pipe(
            map(users => UsersActions.saveInitialUsers({ users })),
            tap(users => localStorage.setItem('users', JSON.stringify(users))),
        ))
    ))
}