import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/api';
import BackButton from '../components/BackButton';
import OrderCard from '../components/OrderCard';
import NoOrdersScreen from './NoOrdersScreen';

export default function OrdersListScreen() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };
        fetchOrders();
    }, [orders]);

    return (
        <View className="flex-1 p-4">
            <BackButton value='My Orders' />
            {orders.length === 0 ? (
                <NoOrdersScreen />
            ) : (
                <OrderCard orders={orders} />
            )}
        </View>
    );
};
