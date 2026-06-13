import axios from "@/providers/axios/axiosInstance";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import { CreateOrderPayload, CustomersAddress, CustomersItemPrice, CustomersPayment, getSupplierAddress, SuppliersItemPrice } from "../types/OrderTypes";

export const getVehicles = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getVehicles);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getDriver = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getDriver);
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

export const getSupplier = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getSupplier);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getSupplierAddess = async (credentials:getSupplierAddress) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getSupplierAddess,credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getSupplierItemPrice = async (credentials:SuppliersItemPrice) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getSupplierItemPrice ,credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getSupplierPayment = async (credentials:SuppliersItemPrice) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getSupplierPayment,credentials);
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

export const getCustomerAddess = async (credentials:CustomersAddress) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getCustomerAddess,credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getCustomerItemPrice = async (credentials:CustomersItemPrice) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getCustomerItemPrice ,credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getCustomerPayment = async (credentials:CustomersPayment) => {
  try {
    const response = await axios.post(API_ENDPOINTS.orders.getCustomerPayment,credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getPartners = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.orders.getPartners);
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