import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const organizationState = (state: RootState) => state.organizations;

export const loadingOrganizationsListSelector = createSelector(organizationState, (state) => state.loadingOrganizationsList);
export const organizationsListSelector = createSelector(organizationState, (state) => state.organizationsList);
export const organizationSelector = createSelector(organizationState, (state) => state.organization);
export const loadingOrganizationSelector = createSelector(organizationState, (state) => state.loadingOrganization);
export const loadingOrganizationUpdateSelector = createSelector(organizationState, (state) => state.loadingOrganizationUpdate);
export const errorSelector = createSelector(organizationState, (state) => state.error);
export const successOrganizationUpdateSelector = createSelector(organizationState, (state) => state.successOrganizationUpdate);
