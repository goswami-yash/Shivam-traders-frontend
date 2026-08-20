import axios from "axios";
import { unauthorizedInterceptor } from "./interceptors";

const apiUrl = (import.meta as any).env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl|| "/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Plug in custom unauthorized + rate-limit handler
unauthorizedInterceptor(axiosInstance);
export default axiosInstance;