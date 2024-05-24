import axios from "axios"
import { BASE_URL } from "../../config";


const getProfile = async (AUTH_TOKEN) => {
    try {
        console.log(AUTH_TOKEN);
        const response = await axios.get(`${BASE_URL}/users/profile/`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export { getProfile };