import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users-store';

export const selectUsersState = createFeatureSelector<UsersState>('users');

// Get the selectedUserId from the UsersState
export const selectSelectedUserId = createSelector(
    selectUsersState,
    (state: UsersState) => state.selectedUserId
)

// Get the list of users from the UsersState
export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) =>  Object.values(state.entities)
);