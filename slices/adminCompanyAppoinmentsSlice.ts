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
}

const initialState: AdminCompanyAppointmentsState = {
  appointments: [],
  loadingAppointments: false,
  errorAppointments: null,
  currentAppointment: null,
  loadingCurrentAppointment: false,
  errorCurrentAppointment: null,
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
      return thunkAPI.rejectWithValue("Error al obtener los citas");
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

const adminCompanyAppointmentsSlice = createSlice({
  name: "adminCompanyAppointments",
  initialState,
  reducers: {},
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
      });
  },
});

export default adminCompanyAppointmentsSlice.reducer;
