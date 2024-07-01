import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { deleteOrder } from '../services/api';

export default function OrderCard({ orders }) {
    const navigation = useNavigation();

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View className="my-3">
                    <View className="flex-row justify-between">
                        <Image className="w-16 h-16 rounded-xl" source={{ uri: item?.restaurant?.image }} />
                        <View className="justify-evenly flex-1 ml-4">
                            <Text className="font-medium">{item?.restaurant.name}</Text>
                            <Text className="font-normal">Total Price: ₹{item.total_price}</Text>
                            <Text>{item.items.length} Items</Text>
                        </View>
                        <Text>#{item.id}</Text>
                    </View>
                    <View className="flex-row my-3 justify-between">
                        <TouchableOpacity
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            className="py-2 px-5 rounded-lg text-white"
                            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
                        >
                            <Text className="text-white">Track Order</Text>
                        </TouchableOpacity>
                        {item.status === 'Pending' ? (
                            <TouchableOpacity
                                style={{ borderColor: themeColors.text }}
                                className="p-2 border px-5 rounded-lg"
                                // onPress={() => deleteOrder(item.id)}
                                onPress={() => Alert.alert("Cancel Order",
                                    "Are you sure you want to cancel the order?", [
                                    {
                                        text: 'No',
                                    },
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            deleteOrder(item.id)
                                            navigation.goBack()
                                        }
                                    }
                                ],
                                    { cancelable: true }
                                )}
                            >
                                <Text style={{ color: themeColors.text }}>Cancel</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    <View className="border-b border-gray-300 w-full"/>
                </View>
            )}
        />
    )
}