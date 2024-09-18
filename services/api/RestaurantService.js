import api from "../../axiosConfig";

const getRestaurants = async () => {
  try {
    const response = await api.get(`/api/restaurants/restaurants/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getRestaurants };
