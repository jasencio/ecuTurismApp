import { Organization, OrganizationListResponse } from "@/types/Organization";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrganizationState {
  organizationsList?: OrganizationListResponse;
  organization?: Organization;
  loadingOrganizationsList: boolean;
  loadingOrganization: boolean;
  loadingOrganizationUpdate: boolean;
  error: string | null;
  successOrganizationUpdate: boolean;
}

const initialState: OrganizationState = {
  organizationsList: undefined,
  organization: undefined,
  loadingOrganizationsList: false,
  loadingOrganization: false,
  loadingOrganizationUpdate: false,
  error: null,
  successOrganizationUpdate: false,
};

export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<OrganizationListResponse>("config/organization");
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener las organizaciones");
    }
  }
);

export const fetchOrganization = createAsyncThunk(
  "organizations/fetchOrganization",
  async (idOrganization: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Organization>(`config/organization/${idOrganization}`);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la organización");
    }
  }
);

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (organization: Omit<Organization, 'id'>, thunkAPI) => {
    try {
      const response = await axiosInstance.post<Organization>("config/organization", organization);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al crear la organización");
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "organizations/updateOrganization",
  async (organization: Organization, thunkAPI) => {
    try {
      const response = await axiosInstance.put<Organization>(`config/organization/${organization.id}`, organization);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al actualizar la organización");
    }
  }
);

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Organizations List
      .addCase(fetchOrganizations.pending, (state) => {
        state.loadingOrganizationsList = true;
        state.organizationsList = undefined;
        state.error = null;
        state.successOrganizationUpdate = false;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loadingOrganizationsList = false;
        state.organizationsList = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loadingOrganizationsList = false;
        state.error = action?.error?.message || "Error al obtener las organizaciones";
      })
      // Fetch Single Organization
      .addCase(fetchOrganization.pending, (state) => {
        state.loadingOrganization = true;
        state.organization = undefined;
        state.error = null;
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loadingOrganization = false;
        state.organization = action.payload;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.loadingOrganization = false;
        state.error = action?.error?.message || "Error al obtener la organización";
      })
      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.loadingOrganizationUpdate = true;
        state.error = null;
        state.successOrganizationUpdate = false;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.organization = action.payload;
        state.successOrganizationUpdate = true;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.error = action?.error?.message || "Error al crear la organización";
        state.successOrganizationUpdate = false;
      })
      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.loadingOrganizationUpdate = true;
        state.error = null;
        state.successOrganizationUpdate = false;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.organization = action.payload;
        state.successOrganizationUpdate = true;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.error = action?.error?.message || "Error al actualizar la organización";
        state.successOrganizationUpdate = false;
      });
  },
});

export default organizationSlice.reducer; 