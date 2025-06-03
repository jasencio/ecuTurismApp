import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const profileState = (state: RootState) => state.profile;

export const loadingSelector = createSelector(profileState, (state) => state.loading);
export const profileDataSelector = createSelector(profileState, (state) => state.profileData);
export const errorSelector = createSelector(profileState, (state) => state.error);