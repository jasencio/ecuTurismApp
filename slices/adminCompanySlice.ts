import { Organization } from "@/types/Organization";
import { ApiResponse } from "@/types/Api";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ImagePickerResult {
  uri: string;
  type?: string;
  fileName?: string;
}
interface AdminCompanyState {
  organization?: Organization;
  loading: boolean;
  error: string | null;
  loadingOrganizationUpdate: boolean;
  successOrganizationUpdate: boolean;
}

const initialState: AdminCompanyState = {
  organization: undefined,
  loading: false,
  error: null,
  loadingOrganizationUpdate: false,
  successOrganizationUpdate: false,
};

export const getAdminCompanyOrganization = createAsyncThunk(
  "adminCompany/fetchOrganization",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Organization>(
        "admin-company/organization"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la organización");
    }
  }
);

export const updateAdminCompanyOrganization = createAsyncThunk(
  "adminCompany/updateOrganization",
  async (
    {
      organization,
      image,
    }: { organization: Omit<Organization, "id">; image?: ImagePickerResult },
    thunkAPI
  ) => {
    try {
      // Convert image to base64 if provided
      let imageBase64: string | undefined;
      if (image) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const payload: Omit<Organization, "id"> & { imageBase64?: string } = {
        ...organization,
        ...(imageBase64 && { imageBase64 }),
      };

      const response = await axiosInstance.put<ApiResponse<Organization>>(
        "admin-company/organization",
        payload
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al actualizar la organización");
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
        state.successOrganizationUpdate = false;
      })
      .addCase(getAdminCompanyOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(getAdminCompanyOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error al obtener la organización";
      })
      .addCase(updateAdminCompanyOrganization.pending, (state) => {
        state.loadingOrganizationUpdate = true;
        state.error = null;
        state.successOrganizationUpdate = false;
      })
      .addCase(updateAdminCompanyOrganization.fulfilled, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.organization = action.payload.data;
        state.successOrganizationUpdate = true;
      })
      .addCase(updateAdminCompanyOrganization.rejected, (state, action) => {
        state.loadingOrganizationUpdate = false;
        state.error = action?.error?.message || "Error al actualizar la organización";
        state.successOrganizationUpdate = false;
      });
  },
});

export default adminCompanySlice.reducer;
