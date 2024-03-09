import { Injectable } from "@angular/core";
import { UsersService } from "@app/_pages/users/users.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { User, UsersActions } from "./users-store";
import { map, switchMap } from "rxjs";

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    initUsers = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.init),
        switchMap(() => this.usersService.getUserList().pipe(
            map(data => {
                return UsersActions.saveInitialUsers({
                    users: data.users.map((user: User) => {
                        return {
                            ...user,
                        }
                    })
                })
            })
        ))
    ))

}