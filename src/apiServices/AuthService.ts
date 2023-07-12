import axios, { AxiosResponse } from "axios";
import { API_URL } from "./ApiServicesConstants";

const BASE_URL = API_URL + "users";

const handleRequest = async (request: Promise<AxiosResponse>): Promise<any> => {
  try {
    const response: AxiosResponse = await request;
    return response;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  addUser: async (data: any): Promise<any> => {
    return handleRequest(axios.post(BASE_URL, data));
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
