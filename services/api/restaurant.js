import axios from "axios"
import { BASE_URL } from "../../config"

const getNearbyRestaurants = async (location) => {
    try {
        const response = await axios.post(`${BASE_URL}/restaurants/nearby-restaurants/`, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        return response.data
    } catch (error) {
        console.error('Error fetching nearby restaurants:', error);
    }
};

export { getNearbyRestaurants };