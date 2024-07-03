import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../config';
import { getToken } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import AddressForm from '../components/AddressForm';

export default function UpdateAddress() {
    const navigation = useNavigation();
    const route = useRoute();
    const { addressId } = route.params;
    const updateAddress = async (userId, streetAddress, city, state, postalCode, label) => {
        try {
            const AUTH_TOKEN = await getToken();
            const response = await axios.put(`${BASE_URL}/users/delivery-addresses/${addressId}/`, {
                user: userId,
                street_address: streetAddress,
                city,
                state,
                postal_code: postalCode,
                address_label: label,
            }, {
                headers: {
                    Authorization: `Token ${AUTH_TOKEN}`,
                }
            });
            if (response.data) {
                navigation.navigate('Address')
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <View>
                <BackButton value={'Edit Address'}/>
                <AddressForm onPress={updateAddress}/>
            </View>
        </SafeAreaView>
    )
}