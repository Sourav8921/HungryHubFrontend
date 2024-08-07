import axios from "axios";
import { BASE_URL } from "../../config";
import * as SecureStore from 'expo-secure-store';

const getCsrfToken = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/restaurants/get-csrf-token/`,
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

const getClientSecret = async (csrfToken, subTotal) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/restaurants/create-payment-intent/`,
      {
        amount: subTotal * 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching client secret:", error);
  }
};

const refreshToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data.access;
  } catch (error) {
    throw error;
  }
};

export { getCsrfToken, getClientSecret, refreshToken };
