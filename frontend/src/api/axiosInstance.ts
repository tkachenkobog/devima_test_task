import axios from "axios";
import { ElNotification } from "element-plus";

import { API_BASE_URL } from "@/constants/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = "An unexpected error occurred";
    if (!error.response) {
      message = "The server is unavailable. Please гun 'npm run devStart' from /backend dir";
    }

    ElNotification({
      title: "error",
      message: message,
      type: "error",
    });

    return Promise.reject(error);
  },
);

export default axiosInstance;
