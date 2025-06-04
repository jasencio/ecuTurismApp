import { ApiResponse } from "@/types/Api";
import { ProfileResponse, ProfileUpdateRequest } from "@/types/Profile";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
    profileData?: ProfileResponse;
    loading: boolean;
    loadingUpdate: boolean;
    error: string | null;
    successUpdate: boolean;
  }

  const initialState: ProfileState = {
    profileData: undefined,
    loading: false,
    loadingUpdate: false,
    error: null,
    successUpdate: false,
  };
  

  export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_: void, thunkAPI) => {
      try {
        const response = await axiosInstance.get<ApiResponse<ProfileResponse>>("user/profile/me");
        console.log('profile');
        console.warn(response.data);
        return response?.data?.data;
      } catch (error: any ) {
        console.log(error);
        return thunkAPI.rejectWithValue("Credenciales inválidas");
      }
    }
  );

  export const fetchUpdateProfile = createAsyncThunk(
    "profile/fetchUpdateProfile",
    async (profileUpdateRequest: ProfileUpdateRequest, thunkAPI) => {
      try {
        // Filter out empty values
        const filteredRequest = Object.entries(profileUpdateRequest).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key as keyof ProfileUpdateRequest] = value;
          }
          return acc;
        }, {} as Partial<ProfileUpdateRequest>);

        const response = await axiosInstance.put<ApiResponse<ProfileResponse>>("user/profile/me", filteredRequest);
        console.log('profile-update');
        console.warn(response.data);
        return response?.data?.data;
      } catch (error: any ) {
        console.log(error);
        return thunkAPI.rejectWithValue("Credenciales inválidas");
      }
    }
  );

  export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profileData = action.payload;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action?.error?.message || "Something went wrong";
        })
        .addCase(fetchUpdateProfile.pending, (state) => {
          state.loadingUpdate = true;
          state.error = null;
          state.successUpdate = false;
        })
        .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
          state.loadingUpdate = false;
          state.profileData = action.payload;
          state.successUpdate = true;
        })
        .addCase(fetchUpdateProfile.rejected, (state, action) => {
          state.loadingUpdate = false;
          state.error = action?.error?.message || "Something went wrong";
          state.successUpdate = false;
        })
  
    },
  });
  export default profileSlice.reducer;
  