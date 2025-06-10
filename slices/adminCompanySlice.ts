import { Organization } from "@/types/Organization";
import { ApiResponse } from "@/types/Api";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminCompanyState {
  organization?: Organization;
  loading: boolean;
  error: string | null;
}

const initialState: AdminCompanyState = {
  organization: undefined,
  loading: false,
  error: null,
};

export const getAdminCompanyOrganization = createAsyncThunk(
  "adminCompany/fetchOrganization",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ApiResponse<Organization>>(
        "admin-company/organization"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la organización");
    }
  }
);

export const adminCompanySlice = createSlice({
  name: "adminCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCompanyOrganization.pending, (state) => {
        state.loading = true;
        state.organization = undefined;
        state.error = null;
      })
      .addCase(getAdminCompanyOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(getAdminCompanyOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error al obtener la organización";
      });
  },
});

export default adminCompanySlice.reducer;
