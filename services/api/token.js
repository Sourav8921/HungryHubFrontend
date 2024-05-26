import AsyncStorage from '@react-native-async-storage/async-storage';

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



export { getToken };