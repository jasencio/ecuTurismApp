import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const usersState = (state: RootState) => state.adminCompanyGuide;

export const loadingGuidesSelector = createSelector(usersState, (state) => state.loading);
export const guidesListSelector = createSelector(usersState, (state) => state.guides);
export const errorGuidesSelector = createSelector(usersState, (state) => state.error);
export const currentGuideSelector = createSelector(usersState, (state) => state.currentGuide);
export const loadingCurrentGuideSelector = createSelector(usersState, (state) => state.loading);
export const errorCurrentGuideSelector = createSelector(usersState, (state) => state.error);

