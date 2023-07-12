import axios, { AxiosResponse } from "axios";
import { API_URL } from "./ApiServicesConstants";

const BASE_URL = API_URL + "mentors";

const handleRequest = async (request: Promise<AxiosResponse>): Promise<any> => {
  try {
    const response: AxiosResponse = await request;
    return response;
  } catch (error) {
    throw error;
  }
};

const MentorService = {
  addMentor: async (data: any): Promise<any> => {
    return handleRequest(axios.post(BASE_URL, data));
  },

  getMentor: async (): Promise<any> => {
    return handleRequest(axios.get(BASE_URL));
  },

  getMentorById: async (data: any): Promise<any> => {
    return handleRequest(axios.get(BASE_URL + `/${data.id}`, data));
  },

  updateMentor: async (data: any): Promise<any> => {
    const url = BASE_URL + `/${data.id}`;
    return handleRequest(axios.put(url, data));
  },

  deleteMentor: async (id: any): Promise<any> => {
    const url = BASE_URL + `/${id}`;
    return handleRequest(axios.delete(url));
  },
};

export default MentorService;
