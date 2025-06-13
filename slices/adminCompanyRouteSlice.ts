import { Route, RouteListResponse, Hardness } from "@/types/Route";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ImagePickerResult {
  uri: string;
  type?: string;
  fileName?: string;
}

interface RouteState {
  routesList?: RouteListResponse;
  route?: Route;
  loadingRoutesList: boolean;
  loadingRoute: boolean;
  loadingRouteUpdate: boolean;
  loadingRouteCreate: boolean;
  error: string | null;
  successRouteUpdate: boolean;
  successRouteCreate: boolean;
}

const initialState: RouteState = {
  routesList: undefined,
  route: undefined,
  loadingRoutesList: false,
  loadingRoute: false,
  loadingRouteUpdate: false,
  loadingRouteCreate: false,
  error: null,
  successRouteUpdate: false,
  successRouteCreate: false,
};

export const getRoutes = createAsyncThunk(
  "routes/getAll",
  async (_: void, thunkAPI) => {
    try {
      const response = await axiosInstance.get<RouteListResponse>(
        "admin-company/route"
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener las rutas");
    }
  }
);

export const getRoute = createAsyncThunk(
  "routes/getOne",
  async (idRoute: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Route>(
        `admin-company/route/${idRoute}`
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al obtener la ruta");
    }
  }
);

export const createRoute = createAsyncThunk(
  "routes/createRoute",
  async (
    {
      route,
      image,
    }: {
      route: Omit<Route, "id" | "createdAt" | "updatedAt" | "mainImage" | "organization">;
      image?: ImagePickerResult;
    },
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

      const payload: Omit<Route, "id" | "createdAt" | "updatedAt" | "mainImage" | "organization"> & {
        imageBase64?: string;
      } = {
        ...route,
        ...(imageBase64 && { imageBase64 }),
      };

      const response = await axiosInstance.post<Route>(
        "admin-company/route",
        payload
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al crear la ruta");
    }
  }
);

export const updateRoute = createAsyncThunk(
  "routes/updateRoute",
  async (
    {
      route,
      image,
    }: {
      route: Omit<Route, "mainImage" | "organization">;
      image?: ImagePickerResult;
    },
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

      const payload: Omit<Route, "mainImage" | "organization"> & {
        imageBase64?: string;
      } = {
        ...route,
        ...(imageBase64 && { imageBase64 }),
      };

      const response = await axiosInstance.put<Route>(
        `admin-company/route/${route.id}`,
        payload
      );
      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al actualizar la ruta");
    }
  }
);

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Routes List
      .addCase(getRoutes.pending, (state) => {
        state.loadingRoutesList = true;
        state.routesList = undefined;
        state.error = null;
        state.successRouteUpdate = false;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.loadingRoutesList = false;
        state.routesList = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.loadingRoutesList = false;
        state.error = action?.error?.message || "Error al obtener las rutas";
      })
      // Fetch Single Route
      .addCase(getRoute.pending, (state) => {
        state.loadingRoute = true;
        state.route = undefined;
        state.error = null;
      })
      .addCase(getRoute.fulfilled, (state, action) => {
        state.loadingRoute = false;
        state.route = action.payload;
      })
      .addCase(getRoute.rejected, (state, action) => {
        state.loadingRoute = false;
        state.error = action?.error?.message || "Error al obtener la ruta";
      })
      // Create Route
      .addCase(createRoute.pending, (state) => {
        state.loadingRouteCreate = true;
        state.error = null;
        state.successRouteCreate = false;
      })
      .addCase(createRoute.fulfilled, (state, action) => {
        state.loadingRouteCreate = false;
        state.route = action.payload;
        state.successRouteCreate = true;
      })
      .addCase(createRoute.rejected, (state, action) => {
        state.loadingRouteCreate = false;
        state.error = action?.error?.message || "Error al crear la ruta";
        state.successRouteCreate = false;
      })
      // Update Route
      .addCase(updateRoute.pending, (state) => {
        state.loadingRouteUpdate = true;
        state.error = null;
        state.successRouteUpdate = false;
      })
      .addCase(updateRoute.fulfilled, (state, action) => {
        state.loadingRouteUpdate = false;
        state.route = action.payload;
        state.successRouteUpdate = true;
      })
      .addCase(updateRoute.rejected, (state, action) => {
        state.loadingRouteUpdate = false;
        state.error = action?.error?.message || "Error al actualizar la ruta";
        state.successRouteUpdate = false;
      });
  },
});

export default routeSlice.reducer;
