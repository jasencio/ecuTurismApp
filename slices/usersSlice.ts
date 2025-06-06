import { User, UserListResponse } from "@/types/Users";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersState {
    usersList?: UserListResponse;
    user?: User;
    loadingUsersList: boolean;
    loadingUser: boolean;
    loadingUserUpdate: boolean;
    error: string | null;
    successUserUpdate: boolean;
  }

  const initialState: UsersState = {
    usersList: undefined,
    user: undefined,
    loadingUsersList: false,
    loadingUser: false,
    loadingUserUpdate: false,
    error: null,
    successUserUpdate: false,
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

  export const updateUser = createAsyncThunk(
    "users/fetchUpdateUser",
    async (user: User, thunkAPI) => {
      try {
        const response = await axiosInstance.put<User>(`config/user/${user.id}`, user);
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
          state.successUserUpdate = false;
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
        })
        .addCase(updateUser.pending, (state) => {
          state.loadingUserUpdate = true;
          state.error = null;
          state.successUserUpdate = false;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loadingUserUpdate = false;
          state.user = action.payload;
          state.successUserUpdate = true;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loadingUserUpdate = false;
          state.error = action?.error?.message || "Something went wrong";
          state.successUserUpdate = false;
        });
    },
  });
  export default usersSlice.reducer;
  