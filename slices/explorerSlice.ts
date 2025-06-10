import { Organization, OrganizationListResponse } from "@/types/Organization";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ExplorerState {
  organizationsList?: OrganizationListResponse;
  loadingOrganizationsList: boolean;
  error: string | null;
}

const initialState: ExplorerState = {
  organizationsList: undefined,
  loadingOrganizationsList: false,
  error: null,
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
        state.error = action?.error?.message || "Error al obtener las organizaciones";
      });
  },
});

export default explorerSlice.reducer;
