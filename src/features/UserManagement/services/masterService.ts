import axiosInstance from "@/providers/axios/axiosInstance";

export const getAll = async (
  api: string
) => {
  const response =
    await axiosInstance.get(api);

  return response.data;
};

export const createRecord = async (
  api: string,
  payload: any
) => {
  const response =
    await axiosInstance.post(
      api,
      payload
    );

  return response.data;
};

export const updateRecord = async (
  api: string,
  id: number,
  payload: any
) => {
  const response =
    await axiosInstance.put(
      `${api}/${id}`,
      payload
    );

  return response.data;
};

export const deleteRecord = async (
  api: string,
  id: number
) => {
  const response =
    await axiosInstance.delete(
      `${api}/${id}`
    );

  return response.data;
};