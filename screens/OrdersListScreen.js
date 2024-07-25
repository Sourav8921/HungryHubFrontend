import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/api';
import BackButton from '../components/BackButton';
import OrderCard from '../components/OrderCard';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersListScreen() {
    const navigation = useNavigation();
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
        <SafeAreaView className="flex-1 p-4">
            <BackButton value='My Orders' />
            {orders.length === 0 ? (
                <View className="justify-center items-center flex-1 space-y-3">
                    <Icon.ShoppingCart width="100" height="100" stroke="gray" />
                    <Text className="text-center text-2xl font-normal">No orders yet</Text>
                    <Text className="text-center text-base text-gray-400">Hit the green button down below to Create and order</Text>
                </View>
            ) : (
                <OrderCard orders={orders} />
            )}
            <CustomButton onPress={() => navigation.navigate('Home')} title='Go to Home' />
        </SafeAreaView>
    );
};
