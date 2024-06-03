import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrderDetails } from '../services/api';
import BackButton from '../components/BackButton';

export default function OrderDetailsScreen({ route }) {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await getOrderDetails(orderId);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details', error);
            }
        }
        fetchOrderDetails();
    }, [orderId]);

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <BackButton value='Orders'/>
            {order ? (
                <>
                    <Text>Order ID: {order.id}</Text>
                    <Text>Status: {order.status}</Text>
                    <Text>Total Price: {order.total_price}</Text>
                    <Text>Created At: {new Date(order.created_at).toLocaleString()}</Text>
                    <Text>Restaurant: {order.restaurant.name}</Text>
                    <Text>User: {order.user}</Text>
                    {order.items.map((item, index) => (
                        <View key={index}>
                            <Text>Item {index + 1}: {item.name}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        </View>
                    ))}
                </>
            ) : (
                <Text>No order details available</Text>
            )}
        </SafeAreaView>
    )
}