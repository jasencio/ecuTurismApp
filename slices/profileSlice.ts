import { ApiResponse } from "@/types/Api";
import { ProfileResponse } from "@/types/Profile";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
    profileData?: ProfileResponse;
    loading: boolean;
    error: string | null;
  }

  const initialState: ProfileState = {
    profileData: undefined,
    loading: false,
    error: null,
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
  
    },
  });
  export default profileSlice.reducer;
  