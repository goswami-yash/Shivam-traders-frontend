import axios from "@/providers/axios/axiosInstance";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import { cleanObject } from "@/shared/utils/cleanObject";

export const getAdminList = async (
  key: string,
  pagenumber: number,
  pagesize: number,
  filters: Record<string, any> = {}
) => {
  const payload = {
    pagenumber,
    pagesize,
    ...cleanObject(filters),
  };

  switch (key) {
    case "CustomerList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getCustomerList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

   
    case "CustomerAddressList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getCustomerAddressList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "CustomerPaymentList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getCustomerPaymentList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "CustomerItemPriceList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getCustomerItemPriceList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

  }
}

export const updateAdminService = async (
  key: string,
  payload: any
) => {
  switch (key) {

    case "UpdateCustomer":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateCustomer,
        payload
      );

    case "UpdateCustomerAddress":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateCustomerAddress,
        payload
      );

    case "UpdateCustomerPayment":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateCustomerPayment,
        payload
      );

      case "UpdateCustomerItemPrice":
        return axios.post(
          API_ENDPOINTS.adminAction.UpdateCustomerItemPrice,
          payload
        );

  }
};

export const getAdminDetails = async (
  key: string,
  id: number
) => {
  switch (key) {

    case "CustomerDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getCustomerById,
        { customer_id: id }
      );

    case "CustomerAddressDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getCustomerAddressById,
        { customer_address_id: id }
      );

    case "CustomerPaymentDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getCustomerPaymentById,
        { customer_payment_id: id }
      );

      case "CustomerItemPriceDetails":
        return axios.post(
          API_ENDPOINTS.adminAction.getCustomerItemPriceById,
          { item_price_id: id }
        );

  }

};

export const deleteAdminService = async (
  key: string,
  id: number
) => {
  switch (key) {
    case "DeleteCustomer":
      try {
        
        const response = axios.post(
          API_ENDPOINTS.adminAction.DeleteCustomer,
          { customer_id: id }
        );

        return response ;
      } catch (error) {
         throw error.response?.data || error.message;
      }

    case "DeleteCustomerAddress":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteCustomerAddress,
        { customer_address_id: id }
      );

    case "DeleteCustomerPayment":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteCustomerPayment,
        { assign_id: id }
      );

      case "DeleteCustomerItemPrice":
        return axios.post(
          API_ENDPOINTS.adminAction.DeleteCustomerItemPrice,
          { item_price_id: id }
        );

    default:
      throw new Error("Invalid Delete Type");
  }
};

export const addAdminService = async (
  apiKey: string,
  payload: any
) => {
  try {
    const url =
      API_ENDPOINTS.adminAction[
      apiKey as keyof typeof API_ENDPOINTS.adminAction
      ];

    if (!url) {
      throw new Error(
        `API Key ${apiKey} not found`
      );
    }

    const response = await axios.post(
      url,
      payload
    );

    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data ||
      error.message
    );
  }
};


