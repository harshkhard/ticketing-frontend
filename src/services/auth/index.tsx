import axios, { AxiosError } from "axios";
import { BaseApi } from "../base";

const baseApiPath = import.meta.env.VITE_BASE_API;
const authApiPath = baseApiPath + "athlete";

export const AuthApi = {
  login: async (userName: string) => {
    return BaseApi({
      url: `${authApiPath}/login`,
      data: { athlete_id: userName },
      method: "POST",
    });
  },

  signup: async (userName: string, name: string) => {
    return BaseApi({
      url: `${authApiPath}/`,
      data: { athlete_id: userName, athlete_name: name },
      method: "POST",
    });
  },
};
