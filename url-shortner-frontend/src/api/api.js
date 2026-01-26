import axios from "axios";
import useAuthStore from "../store/AuthStore";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // keep false unless using cookies
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional auto logout
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
