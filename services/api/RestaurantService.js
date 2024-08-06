import api from "../../axiosConfig";

const getRestaurants = async () => {
  try {
    const response = await api.get(`/api/restaurants/restaurants/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};

export { getRestaurants };
