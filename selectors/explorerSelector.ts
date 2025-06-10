import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const explorerState = (state: RootState) => state.explorer;

export const organizationsListSelector = createSelector(
  explorerState,
  (state) => state.organizationsList
);

export const loadingOrganizationsListSelector = createSelector(
  explorerState,
  (state) => state.loadingOrganizationsList
);

export const errorSelector = createSelector(
  explorerState,
  (state) => state.error
);
