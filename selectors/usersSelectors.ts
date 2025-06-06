import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const usersState = (state: RootState) => state.users;

export const loadingUsersListSelector = createSelector(usersState, (state) => state.loadingUsersList);
export const usersListSelector = createSelector(usersState, (state) => state.usersList);
export const errorSelector = createSelector(usersState, (state) => state.error);
export const userSelector = createSelector(usersState, (state) => state.user);
export const loadingUserSelector = createSelector(usersState, (state) => state.loadingUser);
export const loadingUserUpdateSelector = createSelector(usersState, (state) => state.loadingUserUpdate);
export const successUpdateUserSelector = createSelector(usersState, (state) => state.successUserUpdate);
