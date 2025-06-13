import { RootState } from '@/store';

export const selectAdminCompanyRouteState = (state: RootState) => state.adminCompanyRoute;

export const selectRoutesList = (state: RootState) => state.adminCompanyRoute.routesList;

export const selectRoute = (state: RootState) => state.adminCompanyRoute.route;

export const selectLoadingRoutesList = (state: RootState) => state.adminCompanyRoute.loadingRoutesList;
export const selectLoadingRoute = (state: RootState) => state.adminCompanyRoute.loadingRoute;
export const selectLoadingRouteUpdate = (state: RootState) => state.adminCompanyRoute.loadingRouteUpdate;
export const selectLoadingRouteCreate = (state: RootState) => state.adminCompanyRoute.loadingRouteCreate;

export const selectRouteError = (state: RootState) => state.adminCompanyRoute.error;

export const selectSuccessRouteUpdate = (state: RootState) => state.adminCompanyRoute.successRouteUpdate;
export const selectSuccessRouteCreate = (state: RootState) => state.adminCompanyRoute.successRouteCreate;
