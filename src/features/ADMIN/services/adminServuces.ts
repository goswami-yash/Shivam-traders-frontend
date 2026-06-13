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
            case "SuplierList":
                try {
                    const response = await axios.post(API_ENDPOINTS.adminAction.getSuplierList, payload);
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
    }
}