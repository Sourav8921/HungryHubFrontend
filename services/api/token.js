import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Alert } from 'react-native';

// Function to retrieve the authentication token from AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        return token;
    } catch (error) {
        console.error('Error retrieving authentication token:', error);
        return null;
    }
};

const getCsrfToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/restaurants/get-csrf-token/`, {
            withCredentials: true
        });
        return response.data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
}

const getClientSecret = async (csrfToken, subTotal) => {
    try {
        const response = await axios.post(`${BASE_URL}/restaurants/create-payment-intent/`, {
            amount: subTotal * 100,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching client secret:', error);
    }
};

export { getToken, getCsrfToken, getClientSecret };