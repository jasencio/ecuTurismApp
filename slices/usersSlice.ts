import { User, UserListResponse } from "@/types/Users";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersState {
    usersList?: UserListResponse;
    user?: User;
    loadingUsersList: boolean;
    loadingUser: boolean;
    error: string | null;
  }

  const initialState: UsersState = {
    usersList: undefined,
    user: undefined,
    loadingUsersList: false,
    loadingUser: false,
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

  export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async (idUser: string, thunkAPI) => {
      try {
        const response = await axiosInstance.get<User>(`config/user/${idUser}`);
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
          state.usersList = undefined;
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
        .addCase(fetchUser.pending, (state) => {
          state.loadingUser = true;
          state.user = undefined;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loadingUser = false;  
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loadingUser = false;
          state.error = action?.error?.message || "Something went wrong";
        });
    },
  });
  export default usersSlice.reducer;
  