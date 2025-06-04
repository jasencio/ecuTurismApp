import {LoginRequest, SignupRequest, TokenResponse } from "@/types/Session";
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
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL+"/auth/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      if(response.ok){
       const data =  await response.json(); 
        return data;
      }else{
        const error = await response.json(); 
        return thunkAPI.rejectWithValue("Failed to fetch issues.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch issues.");
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "session/fetchLogin",
  async (request: LoginRequest, thunkAPI) => {
    try {
      const {email, password } = request;
      const response = await axiosInstance.post<ApiResponse<TokenResponse>>("auth/login", {
        email,
        password,
      });
      return response?.data?.data;
    } catch (error: any ) {
      return thunkAPI.rejectWithValue("Credenciales inválidas");
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
        setAuthHeader(action.payload.data.token)
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
        setAuthHeader(action.payload.token)
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

  },
});
export default sessionSlice.reducer;
