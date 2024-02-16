import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createFeatureSelector, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";

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
    loading: boolean;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const selectUsersState = createFeatureSelector<UsersState>(UsersStoreKey);
export const selectAllUsers = createSelector(selectUsersState, usersAdapter.getSelectors().selectAll);

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null,
    loading: false
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
        'Update User': props<{ user: User }>(),
        'Create User': props<{ user: User }>(),
        'Delete User': props<{ id: string }>(),
        'Load Users': emptyProps(),
        'Load Users Success': emptyProps(),
        'Load Users Failure': emptyProps(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.saveInitialUsers, (state, { users }) => {
            return usersAdapter.setAll(users, { ...state, selectedUserId: null });
        }),
        on(UsersActions.updateUser, (state, { user }) => {
            return usersAdapter.updateOne({ id: user.id, changes: user}, state);
        }),
        on(UsersActions.createUser, (state, { user }) => {
            return usersAdapter.addOne(user, state);
        }),
        on(UsersActions.deleteUser, (state, { id }) => {
            return usersAdapter.removeOne(id, state);
        }),
        on(UsersActions.loadUsers, state => {
            return { ...state, loading: true };
        }),
        on(UsersActions.loadUsersSuccess, state => {
            return { ...state, loading: false };
        }),
        on(UsersActions.loadUsersFailure, state => {
            return { ...state, loading: false };
        }),
    )
});

