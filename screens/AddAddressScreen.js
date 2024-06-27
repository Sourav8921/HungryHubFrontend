import { View, Text, Button, TextInput, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { getToken } from '../services/api';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import CustomButton from '../components/CustomButton';

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
                <BackButton />
                <View className="my-6 space-y-4">
                    <View>
                        <Text className="text-base">Street Address</Text>
                        <TextInput
                            className="bg-gray-200 p-2 rounded-lg mt-2 h-12"
                            placeholder="Street Address"
                            value={streetAddress}
                            onChangeText={setStreetAddress}
                        />
                    </View>
                    <View className="flex-row justify-between space-x-2">
                        <View className="flex-1">
                            <Text className="text-base">City</Text>
                            <TextInput
                                className="bg-gray-200 p-2 rounded-lg mt-2 h-12"
                                placeholder="City"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base">State</Text>
                            <TextInput
                                className="bg-gray-200 p-2 rounded-lg mt-2 h-12"
                                placeholder="State"
                                value={state}
                                onChangeText={setState}
                            />
                        </View>
                    </View>
                    <View>
                        <Text className="text-base">Postal</Text>
                        <TextInput
                            className="bg-gray-200 p-2 rounded-lg mt-2 h-12"
                            placeholder="Postal Code"
                            value={postalCode}
                            onChangeText={setPostalCode}
                        />
                    </View>
                </View>
                <CustomButton onPress={handleSubmit} title='SAVE ADDRESS' />
            </View>
        </SafeAreaView>
    )
}