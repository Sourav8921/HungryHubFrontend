import axios from "axios";

import { setIsAuth } from "./redux/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "./services/api/TokenService";
import { store } from "./redux/store";

const api = axios.create({
  baseURL: "http://192.168.155.232:8000", // Set your base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        //refresh the token
        const newAccessToken = await refreshToken();
        // Update the authorization header with the new token
        await AsyncStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (error) {
        store.dispatch(setIsAuth(false));
        alert("Session expired, Please login again")
      }
    }

    return Promise.reject(error);
  }
);

export default api;
