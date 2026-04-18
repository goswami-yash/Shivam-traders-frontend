import axios from "@/providers/axios/axiosInstance";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import { CreateOrderPayload } from "../types/OrderTypes";

export const getVehicles = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getVehicles);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getLaburers = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getLaburers);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getItems = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getItems);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getCustomers = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getCustomers);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const createOrders = async (payload: CreateOrderPayload) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.createorder, payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export async function uploadToSignedUrl(file: File, signedUrl: string, p0: { onUploadProgress: (progressEvent: ProgressEvent) => void; }) {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,  
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Upload to signed URL failed");
  }

  return true;
}