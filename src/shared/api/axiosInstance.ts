import axios, { AxiosInstance } from "axios";
import { transformKeys, camelCase, snakeCase } from "./transformers";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://bothubq.com/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const authToken = import.meta.env.VITE_AUTHORIZATION_KEY;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  if (config.data) {
    config.data = transformKeys(config.data, snakeCase);
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.data) {
    response.data = transformKeys(response.data, camelCase);
  }
  return response;
});
