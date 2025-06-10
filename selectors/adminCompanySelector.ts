import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const adminCompanyState = (state: RootState) => state.adminCompany;

export const organizationSelector = createSelector(
  adminCompanyState,
  (state) => state.organization
);

export const loadingSelector = createSelector(
  adminCompanyState,
  (state) => state.loading
);

export const errorSelector = createSelector(
  adminCompanyState,
  (state) => state.error
);

export const loadingOrganizationUpdateSelector = createSelector(
  adminCompanyState,
  (state) => state.loadingOrganizationUpdate
);

export const successOrganizationUpdateSelector = createSelector(
  adminCompanyState,
  (state) => state.successOrganizationUpdate
);




