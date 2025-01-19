import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/store/store";
import { logoutSuccess } from "@/store/features/auth/auth.slice";
import { BACKEND_URL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh_token = Cookies.get("refresh_token");
      try {
        const response: { data: { access_token: string } } =
          await axiosInstance.post("/api/auth/refresh", {
            refresh_token,
          });
        Cookies.set("access_token", response.data.access_token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutSuccess());
        // Handle token refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
