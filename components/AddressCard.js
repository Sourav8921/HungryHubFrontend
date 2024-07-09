import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { themeColors } from '../theme';
import { deleteAddress } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resetAddress, selectAddress } from '../redux/address';

export default function AddressCard({ address }) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { deliveryAddress } = useSelector((state) => state.address);

    const handleSelectAddress = () => {
        dispatch(selectAddress(address));
        Alert.alert(
            "Address Selected",
            "The address has been selected.",
            [
                {
                    text: "OK",
                    onPress: () => navigation.goBack()
                }
            ],
            { cancelable: false }
        );
    };

    const handleDeleteAddress = () => {
        deleteAddress(address.id)
        if(deliveryAddress.id === address.id) dispatch(resetAddress())
        Alert.alert(
            "Address Deleted",
            "The address has been deleted.",
            [
                {
                    text: "OK",
                    onPress: () => navigation.goBack()
                }
            ],
            { cancelable: false }
        );
    }
    return (
        <TouchableOpacity onPress={handleSelectAddress}>
            <View className="flex-row mt-4 p-4 bg-gray-50 rounded-lg">
                <View>
                    <View className="bg-white rounded-full p-3">
                        <AntDesign name="home" size={24} color={themeColors.bgColor(1)} />
                    </View>
                </View>
                <View className="ml-4 flex-1 space-y-1">
                    <View className="flex-row justify-between">
                        <Text className="font-medium text-base">{address.address_label}</Text>
                        <View className="flex-row gap-4">
                            <TouchableOpacity onPress={() => navigation.navigate("UpdateAddress", { 'addressId': address.id })}>
                                <AntDesign name="edit" size={20} color={themeColors.bgColor(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeleteAddress}>
                                <AntDesign name="delete" size={20} color={themeColors.bgColor(1)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className="text-gray-500">{address.street_address}, {address.city}, {address.state}, {'\n'}{address.postal_code}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}