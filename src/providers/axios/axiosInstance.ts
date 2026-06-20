import axios from "axios";

const apiUrl = (import.meta as any).env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl|| "/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;