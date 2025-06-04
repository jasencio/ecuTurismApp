import { ApiResponse } from "@/types/Api";
import { UserListResponse } from "@/types/Users";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersState {
    usersList?: UserListResponse;
    loadingUsersList: boolean;
    error: string | null;
  }

  const initialState: UsersState = {
    usersList: undefined,
    loadingUsersList: false,
    error: null,
  };
  

  export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_: void, thunkAPI) => {
      try {
        const response = await axiosInstance.get<UserListResponse>("config/user");
        return response?.data;
      } catch (error: any ) {
        return thunkAPI.rejectWithValue("Credenciales inválidas");
      }
    }
  );

  export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loadingUsersList = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loadingUsersList = false;
          state.usersList = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loadingUsersList = false;
          state.error = action?.error?.message || "Something went wrong";
        })
  
    },
  });
  export default usersSlice.reducer;
  