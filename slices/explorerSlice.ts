import { Organization, OrganizationListResponse } from "@/types/Organization";
import { Route, RouteListResponse } from "@/types/Route";
import { Appointment, AppointmentCreate } from "@/types/Appointment";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ExplorerState {
  organizationsList?: OrganizationListResponse;
  loadingOrganizationsList: boolean;
  error: string | null;
  organization?: Organization;
  loadingOrganization: boolean;
  errorOrganization: string | null;
  organizationRoutes?: RouteListResponse;
  loadingOrganizationRoutes: boolean;
  errorOrganizationRoutes: string | null;
  route?: Route;
  loadingRoute: boolean;
  errorRoute: string | null;
  creatingAppointment: boolean;
  errorCreatingAppointment: string | null;
  appointment: Appointment | null;
}

const initialState: ExplorerState = {
  organizationsList: undefined,
  loadingOrganizationsList: false,
  error: null,
  organization: undefined,
  loadingOrganization: false,
  errorOrganization: null,
  organizationRoutes: undefined,
  loadingOrganizationRoutes: false,
  errorOrganizationRoutes: null,
  route: undefined,
  loadingRoute: false,
  errorRoute: null,
  creatingAppointment: false,
  errorCreatingAppointment: null,
  appointment: null,
};

export const getOrganizations = createAsyncThunk(
  "explorer/getOrganizations",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<OrganizationListResponse>(
        "/explorer/organizations"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener las organizaciones");
    }
  }
);

export const getOrganization = createAsyncThunk(
  "explorer/getOrganization",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Organization>(
        `/explorer/organizations/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la organización");
    }
  }
);

export const getOrganizationRoutes = createAsyncThunk(
  "explorer/getOrganizationRoutes",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<RouteListResponse>(
        `/explorer/organizations/${id}/routes`
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        "Error al obtener las rutas de la organización"
      );
    }
  }
);

export const getRoute = createAsyncThunk(
  "explorer/getRoute",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Route>(`/explorer/routes/${id}`);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la ruta");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "explorer/createAppointment",
  async (appointmentData: AppointmentCreate, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/explorer/appointments", appointmentData);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al crear la cita");
    }
  }
);

export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Organizations List
      .addCase(getOrganizations.pending, (state) => {
        state.loadingOrganizationsList = true;
        state.organizationsList = undefined;
        state.error = null;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.loadingOrganizationsList = false;
        state.organizationsList = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.loadingOrganizationsList = false;
        state.error =
          action?.error?.message || "Error al obtener las organizaciones";
      })
      // Fetch Organization
      .addCase(getOrganization.pending, (state) => {
        state.loadingOrganization = true;
        state.organization = undefined;
        state.errorOrganization = null;
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.loadingOrganization = false;
        state.organization = action.payload;
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.loadingOrganization = false;
        state.errorOrganization =
          action?.error?.message || "Error al obtener la organización";
      })
      // Fetch Organization Routes
      .addCase(getOrganizationRoutes.pending, (state) => {
        state.loadingOrganizationRoutes = true;
        state.organizationRoutes = undefined;
        state.errorOrganizationRoutes = null;
      })
      .addCase(getOrganizationRoutes.fulfilled, (state, action) => {
        state.loadingOrganizationRoutes = false;
        state.organizationRoutes = action.payload;
      })
      .addCase(getOrganizationRoutes.rejected, (state, action) => {
        state.loadingOrganizationRoutes = false;
        state.errorOrganizationRoutes =
          action?.error?.message ||
          "Error al obtener las rutas de la organización";
      })
      // Fetch Route
      .addCase(getRoute.pending, (state) => {
        state.loadingRoute = true;
        state.route = undefined;
        state.errorRoute = null;
      })
      .addCase(getRoute.fulfilled, (state, action) => {
        state.loadingRoute = false;
        state.route = action.payload;
      })
      .addCase(getRoute.rejected, (state, action) => {
        state.loadingRoute = false;
        state.errorRoute =
          action?.error?.message || "Error al obtener la ruta";
      })
      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.creatingAppointment = true;
        state.errorCreatingAppointment = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.creatingAppointment = false;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.creatingAppointment = false;
        state.errorCreatingAppointment =
          action?.error?.message || "Error al crear el agendamiento";
      });
  },
});

export default explorerSlice.reducer;
