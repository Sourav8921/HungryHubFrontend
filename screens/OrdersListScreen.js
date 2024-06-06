import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import OrderCard from '../components/OrderCard';

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
    }, []);
    
    return (
        <View className="flex-1 p-4">
            <BackButton value='My Orders' />
            <OrderCard orders={orders}/>
        </View>
    );
};
