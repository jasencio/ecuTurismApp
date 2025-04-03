
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Base URL del servicio externo
  headers: {
    'Content-Type': 'application/json' 
   },
});

export const setAuthHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};




export default axiosInstance;