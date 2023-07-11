import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "./AxiosSetup";
/**
 * Performs an HTTP request using the specified method, URL, and payload.
 *
 * @param {string} method - The HTTP method ('get', 'post', 'put', 'delete').
 * @param {string} url - The URL to send the request to.
 * @param {any} [payload] - The request payload (optional).
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */

const request = async (
  method: string,
  url: string,
  payload?: any
): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosInstance.request({
      method,
      url,
      data: payload,
    });
    return response?.data;
  } catch (error) {
    console.error(
      `Failed to perform ${method.toUpperCase()} request to ${url}:`,
      error
    );
    throw error;
  }
};

/**
 * Service for making API requests.
 */
const ApiService = {
  /**
   * Performs an HTTP GET request.
   */
  get: async (urlRoute: string): Promise<any> => request("get", urlRoute),

  /**
   * Performs an HTTP POST request.
   */
  post: async (urlRoute: string, payload: any): Promise<any> =>
    request("post", urlRoute, payload),

  /**
   * Performs an HTTP PUT request.
   */
  put: async (urlRoute: string, payload: any): Promise<any> =>
    request("put", urlRoute, payload),

  /**
   * Performs an HTTP DELETE request.
   */
  delete: async (urlRoute: string): Promise<any> => request("delete", urlRoute),
};

export default ApiService;
