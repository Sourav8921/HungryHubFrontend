import api from "../../axiosConfig";

const getOrders = async () => {
  try {
    const response = await api.get(`/api/restaurants/orders/`);
    return response.data;
  } catch (error) {
    console.error("Error getting orders", error);
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(
      `/api/restaurants/orders/${orderId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting order details", error);
  }
};

const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(
      `/api/restaurants/orders/${orderId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting order", error);
    throw error;
  }
};

const submitOrder = async (orderDetails, paymentMethod, paymentIntentId = null) => {
    try {
        const response = await api.post("/api/restaurants/orders/", {
          order_details: orderDetails,
          payment_method: paymentMethod,
          payment_intent_id: paymentIntentId
        } );
        return response;
    } catch (error) {
        throw error;
    }
}

export { getOrders, getOrderDetails, deleteOrder, submitOrder };
