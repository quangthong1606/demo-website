import { Routes } from "@/config/routes";
import axios from "axios";
import Router from "next/router";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "hk",
  },
});
// Change request data/error here
Axios.interceptors.request.use((config) => {
  //@ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: "",
  };

  return config;
});

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response && error.response.data.message === "Not Authorized")
    ) {
      Router.replace(Routes.home);
    }
    return Promise.reject(error);
  },
);

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }
}
