import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const UsersStoreKey = "users";

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
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id
});

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
        'Update User': props<{ id: string, changes: User }>(),
        'Set Selected User ID': props<{ selectedUserId: any }>(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions['saveInitialUsers'], (state, { users }) => {
            return usersAdapter.setAll(users, state)
        }),
        on(UsersActions['updateUser'], (state, { id, changes }) => {
            return usersAdapter.updateOne({ id, changes }, state)
        }),
        on(UsersActions['setSelectedUserId'], (state, { selectedUserId }) => {
            return {
                ...state,
                selectedUserId
            }
        })
    )
});
