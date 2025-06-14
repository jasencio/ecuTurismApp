import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserListResponse } from "../types/Users";
import axiosInstance from "@/utils/axiosInstance";

interface AdminCompanyGuideState {
  guides: User[];
  currentGuide: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminCompanyGuideState = {
  guides: [],
  currentGuide: null,
  loading: false,
  error: null,
};

export const getGuides = createAsyncThunk(
  "adminCompanyGuide/getGuides",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<UserListResponse>(
        "admin-company/guides"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener los guías");
    }
  }
);

export const getGuide = createAsyncThunk(
  "adminCompanyGuide/getGuide",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<User>(`admin-company/guides/${id}`);
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener el guía");
    }
  }
);

const adminCompanyGuideSlice = createSlice({
  name: "adminCompanyGuide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGuides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.guides = action.payload;
      })
      .addCase(getGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error al obtener los guías";
      })
      .addCase(getGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGuide = action.payload;
      })
      .addCase(getGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error al obtener el guía";
      });
  },
});

export default adminCompanyGuideSlice.reducer;
