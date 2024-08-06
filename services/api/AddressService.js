import api from "../../axiosConfig";

const getAddresses = async () => {
    try {
        const response = await api.get(`/api/users/delivery-addresses/`);
        return response.data
    } catch (error) {
        throw error;
    }
}

const deleteAddress = async (addressId) => {
    try {
        const response = await api.delete(`/api/users/delivery-addresses/${addressId}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting address', error);
        throw error;
    }
};


export { getAddresses, deleteAddress }