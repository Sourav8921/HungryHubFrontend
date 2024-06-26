import axios from "axios";
import { getToken } from "./token";
import { BASE_URL } from "../../config";

const getAddresses = async () => {
    try {
        const AUTH_TOKEN = await getToken();
        const response = await axios.get(`${BASE_URL}/users/delivery-addresses/`, {
            headers: {
                Authorization: `Token ${AUTH_TOKEN}`,
            }
        });
        return response.data
    } catch (error) {
        console.error('Error getting Addresses',error);
    }
}

export { getAddresses }