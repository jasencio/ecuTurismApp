import { Organization, OrganizationListResponse } from "@/types/Organization";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ImagePickerResult {
  uri: string;
  type?: string;
  fileName?: string;
}

interface OrganizationState {
  organizationsList?: OrganizationListResponse;
  organization?: Organization;
  loadingOrganizationsList: boolean;
  loadingOrganization: boolean;
  loadingOrganizationUpdate: boolean;
  loadingOrganizationCreate: boolean;
  error: string | null;
  successOrganizationUpdate: boolean;
  successOrganizationCreate: boolean;
}

const initialState: OrganizationState = {
  organizationsList: undefined,
  organization: undefined,
  loadingOrganizationsList: false,
  loadingOrganization: false,
  loadingOrganizationUpdate: false,
  loadingOrganizationCreate: false,
  error: null,
  successOrganizationUpdate: false,
  successOrganizationCreate: false,
};

export const getOrganizations = createAsyncThunk(
  "organizations/getAll",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<OrganizationListResponse>(
        "config/organization"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener las organizaciones");
    }
  }
);

export const getOrganization = createAsyncThunk(
  "organizations/getOne",
  async (idOrganization: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Organization>(
        `config/organization/${idOrganization}`
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la organización");
    }
  }
);

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (
    {
      organization,
      image,
    }: { organization: Omit<Organization, "id"|"createdAt"|"updatedAt">; image?: ImagePickerResult },
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

      const response = await axiosInstance.post<Organization>(
        "config/organization",
        payload
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al crear la organización");
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "organizations/updateOrganization",
  async (
    {
      organization,
      image,
    }: { organization: Organization; image?: ImagePickerResult },
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

      const payload: Organization & { imageBase64?: string } = {
        ...organization,
        ...(imageBase64 && { imageBase64 }),
      };

      const response = await axiosInstance.put<Organization>(
        `config/organization/${organization.id}`,
        payload
      );
      return response?.data;
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
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
      .addCase(getOrganizations.pending, (state) => {
        state.loadingOrganizationsList = true;
        state.organizationsList = undefined;
        state.error = null;
        state.successOrganizationUpdate = false;
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
      // Fetch Single Organization
      .addCase(getOrganization.pending, (state) => {
        state.loadingOrganization = true;
        state.organization = undefined;
        state.error = null;
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.loadingOrganization = false;
        state.organization = action.payload;
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.loadingOrganization = false;
        state.error =
          action?.error?.message || "Error al obtener la organización";
      })
      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.loadingOrganizationCreate = true;
        state.error = null;
        state.successOrganizationCreate = false;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loadingOrganizationCreate = false;
        state.organization = action.payload;
        state.successOrganizationCreate = true;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loadingOrganizationCreate = false;
        state.error =
          action?.error?.message || "Error al crear la organización";
        state.successOrganizationCreate = false;
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
        state.error =
          action?.error?.message || "Error al actualizar la organización";
        state.successOrganizationUpdate = false;
      });
  },
});

export default organizationSlice.reducer;
