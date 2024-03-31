import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export const BaseApi = async (params: AxiosRequestConfig): Promise<any> => {
  try {
    await axios.request(params);
  } catch (e) {
    const typedErr = e as AxiosError;
    throw typedErr?.response?.data;
  }
};
