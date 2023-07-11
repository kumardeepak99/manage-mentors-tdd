import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://64a8449adca581464b859173.mockapi.io/mentors";

const MentorService = {
  addMentor: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(BASE_URL, data);
      return response.data;
    } catch (er) {
      console.log("Failed to add mentor");
      throw er;
    }
  },

  getMentor: async (): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.get(BASE_URL);
      return response.data;
    } catch (er) {
      console.log("Failed to get user");
      throw er;
    }
  },

  getMentorById: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.get(
        BASE_URL + `/${data.id}`,
        data
      );
      return response.data;
    } catch (er) {
      console.log("Failed to get mentor");
      throw er;
    }
  },
  updateMentor: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.put(
        BASE_URL + `/${data.id}`,
        data
      );
      return { data: response.data, status: response.status };
    } catch (er) {
      console.log("Failed to update mentor");
      throw er;
    }
  },
  deleteMentor: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.delete(BASE_URL + `/${id}`);
      return response.data;
    } catch (er) {
      console.log("Failed to delete mentor");
      throw er;
    }
  },
};

export default MentorService;
