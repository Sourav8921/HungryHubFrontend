import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrderDetails } from '../services/api';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function OrderDetailsScreen({ route }) {
    const navigation = useNavigation();
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true); // Start loading
            try {
                const data = await getOrderDetails(orderId);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details', error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <Loading />;
    }

    const currentStatus = order.status;
    const statuses = [
        'Pending',
        'Confirmed',
        'Preparing',
        'Out for Delivery',
        'Delivered'
    ];
    //Created styles for active and inactive states.
    // Update State Based on Order Status
    const getStatusStyle = (status) => {
        if (status === currentStatus) {
            return styles.activeStatus;
        }
        return styles.inactiveStatus;
    };
    const getCircleStyle = (status) => {
        if (status === currentStatus) {
            return styles.activeCircle;
        }
        return styles.inactiveCircle;
    };
    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <BackButton value='Orders' />
            <View className="mt-5 flex-1">
                <View className="flex-row gap-4">
                    <Image className="w-16 h-16 rounded-xl" source={{ uri: order?.restaurant?.image }} />
                    <View className="">
                        <Text className="font-medium text-lg">{order?.restaurant?.name}</Text>
                        <Text className="text-gray-400">Ordered at {new Date(order?.created_at).toLocaleString()}</Text>
                        <View className="border-b border-gray-300 w-full" />
                        {order.items.map((item) => {
                            return <Text key={item.id}>{item.name}</Text>
                        })}
                    </View>
                </View>
                <View className="items-center mt-6">
                    <Text className="text-3xl font-black">{order.restaurant.delivery_time} min</Text>
                    <Text className="text-gray-400">ESTIMATED DELIVERY TIME</Text>
                </View>

                {/* Order Status Tracker */}
                <View style={styles.container}>
                    {statuses.map((status, index) => (
                        <View key={index} style={styles.statusContainer}>
                            <View style={styles.circleContainer}>
                                <View style={[styles.circle, getCircleStyle(status)]}></View>
                                {/* this conditional rendering is used to render a line between each status except
                                the last one */}
                                {index < statuses.length - 1 && <View style={styles.line}></View>}
                            </View>
                            <Text style={getStatusStyle(status)}>{status}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="items-center p-4 rounded-full absolute bottom-2 w-full"
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text className="text-white text-lg font-medium">Go to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
    },
    statusContainer: {
        flexDirection: 'row',
    },
    circleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 10,
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 6,
    },
    activeStatus: {
        color: 'orange',
        fontWeight: 'bold',
    },
    inactiveStatus: {
        color: 'gray',
    },
    activeCircle: {
        backgroundColor: 'orange',
        fontWeight: 'bold',
    },
    inactiveCircle: {
        backgroundColor: 'gray',
    },
    line: {
        width: 2,
        height: 35,
        backgroundColor: 'gray',
    },
});