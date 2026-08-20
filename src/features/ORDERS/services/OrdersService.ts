import axios from "@/providers/axios/axiosInstance";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import { AxiosProgressEvent } from "axios";
import {
  Vehicle,
  Driver,
  Labourer,
  Item,
  Supplier,
  Customer,
  Partner,
  PaymentSummary,
  getSupplierAddress,
  SuppliersItemPrice,
  CustomersAddress,
  CustomersItemPrice,
  CustomersPayment,
  CreateOrderPayload,
  OrderFormData,
  OrderList
} from "../types/OrderTypes";

// Interface for address responses
export interface AddressOption {
  id?: number;
  address: string;
}

// Interface for item price responses
export interface ItemPriceResponse {
  rate: number;
}

// Helper function to handle async requests and standardize error handling
const handleRequest = async <T>(requestFn: () => Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

// Generic Upload Options interface
export interface UploadOptions {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

// API Methods
export const getVehicles = () => 
  handleRequest<Vehicle[]>(() => axios.get(API_ENDPOINTS.orders.getVehicles));

export const getDriver = () => 
  handleRequest<Driver[]>(() => axios.get(API_ENDPOINTS.orders.getDriver));

export const getLabourers = () => 
  handleRequest<Labourer[]>(() => axios.get(API_ENDPOINTS.orders.getLaburers));

export const getItems = () => 
  handleRequest<Item[]>(() => axios.get(API_ENDPOINTS.orders.getItems));

export const getSupplier = () => 
  handleRequest<Supplier[]>(() => axios.get(API_ENDPOINTS.orders.getSupplier));

export const getSupplierAddressInfo = (credentials: getSupplierAddress) => 
  handleRequest<AddressOption[]>(() => axios.post(API_ENDPOINTS.orders.getSupplierAddess, credentials));

export const getSupplierItemPrice = (credentials: SuppliersItemPrice) => 
  handleRequest<ItemPriceResponse>(() => axios.post(API_ENDPOINTS.orders.getSupplierItemPrice, credentials));

export const getSupplierPayment = (credentials: SuppliersItemPrice) => 
  handleRequest<PaymentSummary>(() => axios.post(API_ENDPOINTS.orders.getSupplierPayment, credentials));

export const getCustomers = () => 
  handleRequest<Customer[]>(() => axios.get(API_ENDPOINTS.orders.getCustomers));

export const getOrderList = () => 
  handleRequest<OrderList[]>(() => axios.get(API_ENDPOINTS.orders.getOrderList));

export const getCustomerAddress = (credentials: CustomersAddress) => 
  handleRequest<AddressOption[]>(() => axios.post(API_ENDPOINTS.orders.getCustomerAddess, credentials));

export const getCustomerItemPrice = (credentials: CustomersItemPrice) => 
  handleRequest<ItemPriceResponse>(() => axios.post(API_ENDPOINTS.orders.getCustomerItemPrice, credentials));

export const getCustomerPayment = (credentials: CustomersPayment) => 
  handleRequest<PaymentSummary>(() => axios.post(API_ENDPOINTS.orders.getCustomerPayment, credentials));

export const getOrderDetails = (payload: { order_id: string | number }) =>
  handleRequest<any>(() => axios.post(API_ENDPOINTS.orders.getOrderDetails, payload));

export const updateOrderDetails = (payload: any) =>
  handleRequest<any>(() => axios.post(API_ENDPOINTS.orders.updateDetails, payload));

export const getPartners = () => 
  handleRequest<Partner[]>(() => axios.get(API_ENDPOINTS.orders.getPartners));

export const createOrders = (payload: CreateOrderPayload) => 
  handleRequest<OrderFormData>(() => axios.post(API_ENDPOINTS.orders.createorder, payload));

export const uploadToSignedUrl = async (
  file: File,
  signedUrl: string,
  options?: UploadOptions
): Promise<boolean> => {
  try {
    await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: options?.onUploadProgress,
    });
    return true;
  } catch (error) {
    throw new Error("Upload to signed URL failed");
  }
};