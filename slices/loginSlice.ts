import { LoginRequest, SignupRequest, TokenResponse } from "@/types/Session";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { setAuthHeader } from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/Api";

interface SessionState {
  sessionData?: TokenResponse;
  loading: boolean;
  error: string | null;
}
const initialState: SessionState = {
  sessionData: undefined,
  loading: false,
  error: null,
};

export const fetchSignup = createAsyncThunk(
  "session/fetchSignup",
  async (request: SignupRequest, thunkAPI) => {
    try {
      const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
        "/auth/signup",
        {
          ...request,
        }
      );
      return response?.data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Something went wrong during signup.");
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "session/fetchLogin",
  async (request: LoginRequest, thunkAPI) => {
    try {
      const { email, password } = request;
      const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
        "auth/login",
        {
          email,
          password,
        }
      );
      return response?.data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Credenciales inválidas");
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "session/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/user/session/logout");
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Something went wrong during logout.");
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionData = action.payload;
        setAuthHeader(action.payload.token);
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionData = action.payload;
        setAuthHeader(action.payload.token);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.sessionData = undefined;
        setAuthHeader(null);
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export default sessionSlice.reducer;
