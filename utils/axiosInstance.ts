import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Base URL del servicio externo
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      data: config.data instanceof FormData ? 'FormData' : config.data,
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Success:', {
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const setAuthHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

export default axiosInstance;