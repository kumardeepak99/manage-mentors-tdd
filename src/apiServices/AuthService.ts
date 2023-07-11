import axios, { AxiosResponse } from "axios";
import ApiService from "./ApiServices";

const BASE_URL = "https://64a8449adca581464b859173.mockapi.io/users";

const AuthService = {
  addUser: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(BASE_URL, data);
      return { data: response.data, status: response.status };
    } catch (er) {
      console.log("Failed to add user");
      throw er;
    }
  },

  getUserByEmailId: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.get(BASE_URL);
      const user = response.data.find((user: any) => user.email === data.email);
      return { data: user, status: response.status };
    } catch (er) {
      console.log("Failed to get user");
      throw er;
    }
  },

  getUserByEmail: async (data: any): Promise<any> => {
    const response: AxiosResponse = await ApiService.get("users");
    const user = response.data.find((user: any) => user.email === data.email);
    return user;
  },
};

export default AuthService;
