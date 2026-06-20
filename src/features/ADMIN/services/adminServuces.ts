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

    case "VehicleList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getVehicleList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "SupplierList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getSupplierList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "CustomerList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getCustomerList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "DriverList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getDriverList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "ItemList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getItemList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "PlotList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getPlotList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "PartnerList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getPartnerList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "TransporterList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getTransporterList, payload);
        return response.data;
      } catch (error: any) {
        throw error.response?.data || error.message;
      }

    case "LabourerList":
      try {
        const response = await axios.post(API_ENDPOINTS.adminAction.getLabourerList, payload);
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
    case "UpdateDriver":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateDriver,
        payload
      );

    case "UpdateVehicle":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateVehicle,
        payload
      );


    case "UpdateCustomer":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateCustomer,
        payload
      );

    case "UpdateSupplier":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateSupplier,
        payload
      );

    case "UpdateItem":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateItem,
        payload
      );

    case "UpdatePlot":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdatePlot,
        payload
      );

    case "UpdatePartner":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdatePartner,
        payload
      );

    case "UpdateTransporter":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateTransporter,
        payload
      );

    case "UpdateLabourer":
      return axios.post(
        API_ENDPOINTS.adminAction.UpdateLabourer,
        payload
      );
  }
};

export const getAdminDetails = async (
  key: string,
  id: number
) => {
  switch (key) {
    case "DriverDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getDriverById,
        { driver_id: id }
      );

    case "VehicleDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getVehicleById,
        { vehicle_id: id }
      );

    case "CustomerDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getCustomerById,
        { customer_id: id }
      );

    case "SupplierDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getSupplierById,
        { supplier_id: id }
      );

    case "ItemDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getItemById,
        { item_id: id }
      );

    case "PlotDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getPlotById,
        { plot_id: id }
      );

    case "PartnerDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getPartnerById,
        { partner_id: id }
      );

    case "TransporterDetails":
      return axios.post(
        API_ENDPOINTS.adminAction.getTransporterById,
        { transporter_id: id }
      );

      case "LabourerDetails":
        return axios.post(
          API_ENDPOINTS.adminAction.getLabourerById,
          { labourer_id: id }
        );
  }
};

export const deleteAdminService = async (
  key: string,
  id: number
) => {
  switch (key) {
    case "DeleteDriver":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteDriver,
        { driver_id: id }
      );

    case "DeleteVehicle":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteVehicle,
        { vehicle_id: id }
      );

    case "DeleteCustomer":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteCustomer,
        { customer_id: id }
      );

    case "DeleteSupplier":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteSupplier,
        { supplier_id: id }
      );

    case "DeleteItem":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteItem,
        { item_id: id }
      );

    case "DeletePlot":
      return axios.post(
        API_ENDPOINTS.adminAction.DeletePlot,
        { plot_id: id }
      );

    case "DeletePartner":
      return axios.post(
        API_ENDPOINTS.adminAction.DeletePartner,
        { partner_id: id }
      );

      case "DeleteTransporter":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteTransporter,
        { transporter_id: id }
      );


      case "DeleteLabourer":
      return axios.post(
        API_ENDPOINTS.adminAction.DeleteLabourer,
        { labourer_id: id }
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