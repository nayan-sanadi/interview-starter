import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, usersAdapter } from "./users-store";

export const selectUsersState = createFeatureSelector<UsersState>('users');


export const selectAllUsers = createSelector(
    selectUsersState,
    usersAdapter.getSelectors().selectAll
  );
  
export const selectUserById = (userId: string) => createSelector(
    selectUsersState,
    (state) => state.entities[userId]
  );

export const selectSelectedUserId = createSelector(
    selectUsersState,
    (state) => state.selectedUserId
  );