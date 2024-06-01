import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

export default function OrdersListScreen() {
    const navigation = useNavigation();
    const  [orders, setOrders] = useState([]);

    useEffect(()=> {
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
    <View style={styles.container}>
        <BackButton value='Orders'/>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.orderItem}
                        // onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
                    >
                        <Text>Order #{item.id}</Text>
                        <Text>Total Price: ₹{item.total_price}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    orderItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});