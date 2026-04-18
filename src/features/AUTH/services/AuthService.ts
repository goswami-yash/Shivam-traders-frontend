import axios from "@/providers/axios/axiosInstance";
import { ILogin } from "../types/AuthTypes";
import { API_ENDPOINTS } from "@/providers/api/api-config";

export const login = async (credentials: ILogin) => {
  try {
    const response = await axios.post(API_ENDPOINTS.login.login, credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};


export const logout = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.login.logout);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
