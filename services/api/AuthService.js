import axios from "axios";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../axiosConfig";

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, {
      username,
      password,
    });
    const { access, refresh } = response.data;
    api.defaults.headers.common["Authorization"] = "Bearer " + access;
    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);
    return response;
  } catch (error) {
    throw error;
  }
};

export { loginUser };
