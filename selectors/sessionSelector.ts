import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const sessionState = (state: RootState) => state.session;

export const loadingSelector = createSelector(sessionState, (state) => state.loading);
export const sessionDataSelector = createSelector(sessionState, (state) => state.sessionData);
export const errorSelector = createSelector(sessionState, (state) => state.error);