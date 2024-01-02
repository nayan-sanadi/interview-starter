import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    show: boolean;
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
        'Add User': props<{user: User}>(),
        'Update User': props<{user: User}>(),
        'Delete User': props<{userId: string}>()
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.saveInitialUsers, (state, {users}) => {
            return usersAdapter.setAll(users, { ...state, selectedUserId: null });
        }),
        on(UsersActions.addUser, (state, {user}) => {
            return usersAdapter.addOne(user, state);
        }),
        on(UsersActions.updateUser, (state, {user}) => {
            return usersAdapter.updateOne({id: user.id, changes: user}, state);
        }),
        on(UsersActions.deleteUser, (state, {userId}) => {
            return usersAdapter.removeOne(userId, state);
        })
    )
});

