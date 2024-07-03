import { View, SafeAreaView } from 'react-native'
import React from 'react'
import axios from 'axios';
import { getToken } from '../services/api';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import AddressForm from '../components/AddressForm';
import address from '../redux/address';

export default function CreateAddress() {
    const navigation = useNavigation();

    const createAddress = async (userId, streetAddress, city, state, postalCode, label) => {
        try {
            const AUTH_TOKEN = await getToken();
            const response = await axios.post(`${BASE_URL}/users/delivery-addresses/`, {
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
                <BackButton value={'Add address'}/>
                <AddressForm onPress={createAddress}/>
            </View>
        </SafeAreaView>
    )
}