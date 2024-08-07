import axios from "axios";
import { BASE_URL } from "../../config";
import api from "../../axiosConfig";
import * as SecureStore from 'expo-secure-store';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, {
      username,
      password,
    });
    const { access, refresh } = response.data;
    api.defaults.headers.common["Authorization"] = "Bearer " + access;
    await SecureStore.setItemAsync("accessToken", access);
    await SecureStore.setItemAsync("refreshToken", refresh);
    return response;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register/`, {
      username,
      email,
      password
    })
    return response;
  } catch (error) {
    throw error;
  }
}
export { loginUser, registerUser };
