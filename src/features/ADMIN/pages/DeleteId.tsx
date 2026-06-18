import axios from "@/providers/axios/axiosInstance";
import { API_ENDPOINTS } from "@/providers/api/api-config";

export const deleteAdminService = async (
  type: string,
  id: number
) => {
  const config: Record<string, any> = {
    Driver: {
      url: API_ENDPOINTS.adminAction.DeleteDriver,
      payload: { driver_id: id },
    },

    Vehicle: {
      url: API_ENDPOINTS.adminAction.DeleteVehicle,
      payload: { vehicle_id: id },
    },
  };

  const selected = config[type];

  if (!selected) {
    throw new Error(`Delete config not found for ${type}`);
  }

  const response = await axios.post(
    selected.url,
    selected.payload
  );

  return response.data;
};