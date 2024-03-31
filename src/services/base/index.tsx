import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export const BaseApi = async (params: AxiosRequestConfig): Promise<any> => {
  try {
    const res = await axios.request(params);
    return res.data;
  } catch (e) {
    const typedErr = e as AxiosError;
    throw typedErr?.response?.data;
  }
};
