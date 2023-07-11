import axios from "axios";

export const API_URL = "https://64a8449adca581464b859173.mockapi.io/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
