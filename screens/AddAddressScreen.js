import { View, Text, Button, TextInput, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { getToken } from '../services/api';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function AddAddressScreen() {
    const navigation = useNavigation();
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const { user } = useSelector((state) => state.user);
    const userId = user.id;

    const handleSubmit = async () => {
        try {
            const AUTH_TOKEN = await getToken();
            const response = await axios.post(`${BASE_URL}/users/delivery-addresses/`, {
                user: userId,
                street_address: streetAddress,
                city,
                state,
                postal_code: postalCode,
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
                <TextInput
                    placeholder="Street Address"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                />
                <TextInput
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                />
                <TextInput
                    placeholder="State"
                    value={state}
                    onChangeText={setState}
                />
                <TextInput
                    placeholder="Postal Code"
                    value={postalCode}
                    onChangeText={setPostalCode}
                />
                <Button title="Add Address" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )
}