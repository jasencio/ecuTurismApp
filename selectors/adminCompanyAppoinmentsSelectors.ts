import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const adminCompanyAppointmentsState = (state: RootState) => state.adminCompanyAppointments;

export const loadingAppointmentsSelector = createSelector(adminCompanyAppointmentsState, (state) => state.loadingAppointments);
export const appointmentsSelector = createSelector(adminCompanyAppointmentsState, (state) => state.appointments);
export const errorAppointmentsSelector = createSelector(adminCompanyAppointmentsState, (state) => state.errorAppointments);

export const currentAppointmentSelector = createSelector(adminCompanyAppointmentsState, (state) => state.currentAppointment);
export const loadingCurrentAppointmentSelector = createSelector(adminCompanyAppointmentsState, (state) => state.loadingCurrentAppointment);
export const errorCurrentAppointmentSelector = createSelector(adminCompanyAppointmentsState, (state) => state.errorCurrentAppointment);

export const assigningGuideSelector = createSelector(adminCompanyAppointmentsState, (state) => state.assigningGuide);
export const errorAssigningGuideSelector = createSelector(adminCompanyAppointmentsState, (state) => state.errorAssigningGuide);
export const successAssigningGuideSelector = createSelector(adminCompanyAppointmentsState, (state) => state.successAssigningGuide);