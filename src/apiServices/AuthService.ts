import axios, { AxiosResponse } from "axios";
import { API_URL } from "./ApiServicesConstants";

const AuthService = {
  addUser: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + "/users",
        data
      );
      return { data: response.data, status: response.statusText };
    } catch (er) {
      throw er;
    }
  },

  getUserByEmailId: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.get(API_URL + "/users");
      const user = response.data.find((user: any) => user.email === data.email);
      return { data: user, status: response.statusText };
    } catch (er) {
      throw er;
    }
  },
};

export default AuthService;
