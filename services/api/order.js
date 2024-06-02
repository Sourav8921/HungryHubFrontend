import axios from "axios";
import { getToken } from "./token"
import { BASE_URL } from "../../config";

const getOrders = async () => {
    try {
        const AUTH_TOKEN = await getToken();
        const response = await axios.get(`${BASE_URL}/restaurants/orders/`, {
            headers: {
                Authorization: `Token ${AUTH_TOKEN}`,
            }
        });
        return response.data
    } catch (error) {
        console.error('Error getting orders',error);
    }
}

const getOrderDetails = async (orderId) => {
    try {
        const AUTH_TOKEN = await getToken();
        const response = await axios.get(`${BASE_URL}/restaurants/orders/${orderId}/`, {
            headers: {
                Authorization: `Token ${AUTH_TOKEN}`,
            }
        });
        return response.data
    } catch (error) {
        console.error('Error getting order details', error);
    }
};

export {getOrders, getOrderDetails}