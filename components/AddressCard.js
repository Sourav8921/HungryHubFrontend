import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { themeColors } from '../theme';
import { deleteAddress } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function AddressCard({ address }) {
    const navigation = useNavigation();
    return (
        <View className="flex-row mt-4 p-4 bg-gray-50 rounded-lg">
            <View>
                <View className="bg-white rounded-full p-3">
                    <AntDesign name="home" size={24} color={themeColors.bgColor(1)} />
                </View>
            </View>
            <View className="ml-4 flex-1 space-y-2">
                <View className="flex-row justify-between">
                    <Text>HOME</Text>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => navigation.navigate("UpdateAddress", {'addressId' : address.id})}>
                            <AntDesign name="edit" size={20} color={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteAddress(address.id)}>
                            <AntDesign name="delete" size={20} color={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text className="text-gray-500">{address.street_address}, {address.city}, {address.state}, {'\n'}{address.postal_code}</Text>
            </View>
        </View>
    )
}