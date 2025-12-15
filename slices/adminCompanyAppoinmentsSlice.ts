import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { Appointment } from "@/types/Appointment";

interface AdminCompanyAppointmentsState {
  appointments: Appointment[];
  loadingAppointments: boolean;
  errorAppointments: string | null;
  currentAppointment: Appointment | null;
  loadingCurrentAppointment: boolean;
  errorCurrentAppointment: string | null;
  assigningGuide: boolean;
  errorAssigningGuide: string | null;
  successAssigningGuide: boolean;
}

const initialState: AdminCompanyAppointmentsState = {
  appointments: [],
  loadingAppointments: false,
  errorAppointments: null,
  currentAppointment: null,
  loadingCurrentAppointment: false,
  errorCurrentAppointment: null,
  assigningGuide: false,
  errorAssigningGuide: null,
  successAssigningGuide: false,
};

export const getAppointments = createAsyncThunk(
  "adminCompanyAppointments/getAppointments",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Appointment[]>(
        "admin-company/appointments"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener las citas");
    }
  }
);

export const getAppointment = createAsyncThunk(
  "adminCompanyAppointments/getAppointment",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Appointment>(
        `admin-company/appointments/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la cita");
    }
  }
);

export const assignGuideToAppointment = createAsyncThunk(
  "adminCompanyAppointments/assignGuide",
  async ({ appointmentId, guideId }: { appointmentId: string; guideId: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch<Appointment>(
        `admin-company/appointments/${appointmentId}/assign-guide/${guideId}`);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al asignar el guía");
    }
  }
);

const adminCompanyAppointmentsSlice = createSlice({
  name: "adminCompanyAppointments",
  initialState,
  reducers: {
    clearAssignGuideState: (state) => {
      state.assigningGuide = false;
      state.errorAssigningGuide = null;
      state.successAssigningGuide = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loadingAppointments = true;
        state.errorAppointments = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loadingAppointments = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loadingAppointments = false;
        state.errorAppointments = action?.error?.message || "Error al obtener las citas";
      })
      .addCase(getAppointment.pending, (state) => {
        state.loadingCurrentAppointment = true;
        state.currentAppointment = null;
        state.errorCurrentAppointment = null;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.loadingCurrentAppointment = false;
        state.currentAppointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.loadingCurrentAppointment = false;
        state.errorCurrentAppointment = action?.error?.message || "Error al obtener la cita";
      })
      .addCase(assignGuideToAppointment.pending, (state) => {
        state.assigningGuide = true;
        state.errorAssigningGuide = null;
        state.successAssigningGuide = false;
      })
      .addCase(assignGuideToAppointment.fulfilled, (state, action) => {
        state.assigningGuide = false;
        state.currentAppointment = action.payload;
        state.successAssigningGuide = true;
      })
      .addCase(assignGuideToAppointment.rejected, (state, action) => {
        state.assigningGuide = false;
        state.errorAssigningGuide = action?.error?.message || "Error al asignar el guía";
        state.successAssigningGuide = false;
      });
  },
});

export const { clearAssignGuideState } = adminCompanyAppointmentsSlice.actions;
export default adminCompanyAppointmentsSlice.reducer;
