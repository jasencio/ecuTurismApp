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

export const organizationSelector = createSelector(
  explorerState,
  (state) => state.organization
);

export const loadingOrganizationSelector = createSelector(
  explorerState,
  (state) => state.loadingOrganization
);

export const errorOrganizationSelector = createSelector(
  explorerState,
  (state) => state.error
);

export const organizationRoutesSelector = createSelector(
  explorerState,
  (state) => state.organizationRoutes
);

export const loadingOrganizationRoutesSelector = createSelector(
  explorerState,
  (state) => state.loadingOrganizationRoutes
);

export const errorOrganizationRoutesSelector = createSelector(
  explorerState,
  (state) => state.errorOrganizationRoutes
);

export const routeSelector = createSelector(
  explorerState,
  (state) => state.route
);

export const loadingRouteSelector = createSelector(
  explorerState,
  (state) => state.loadingRoute
);

export const errorRouteSelector = createSelector(
  explorerState,
  (state) => state.errorRoute
);
