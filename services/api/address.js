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

const deleteAddress = async (addressId) => {
    try {
        const AUTH_TOKEN = await getToken();
        const response = await axios.delete(`${BASE_URL}/users/delivery-addresses/${addressId}/`, {
            headers: {
                Authorization: `Token ${AUTH_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting address', error);
        throw error;
    }
};

const createAddress = async () => {

}

export { getAddresses, deleteAddress }