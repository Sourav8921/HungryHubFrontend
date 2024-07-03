import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { themeColors } from '../theme';

export default function AddressForm({ onPress }) {
    const [label, setLabel] = useState('');
    const [showTextField, setShowTextField] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const handlePress = (buttonLabel) => {
        setLabel(buttonLabel);
        setShowTextField(buttonLabel === '');
        setSelectedButton(buttonLabel);
    };

    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const { user } = useSelector((state) => state.user);
    const userId = user.id;
    return (
        <View>
            <View className="my-6 space-y-4">
                <View>
                    <Text className="text-base">Street Address</Text>
                    <TextInput
                        className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                        placeholder="Street Address"
                        value={streetAddress}
                        onChangeText={setStreetAddress}
                    />
                </View>
                <View className="flex-row justify-between space-x-2">
                    <View className="flex-1">
                        <Text className="text-base">City</Text>
                        <TextInput
                            className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                            placeholder="City"
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-base">State</Text>
                        <TextInput
                            className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                            placeholder="State"
                            value={state}
                            onChangeText={setState}
                        />
                    </View>
                </View>
                <View>
                    <Text className="text-base">Postal</Text>
                    <TextInput
                        className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChangeText={setPostalCode}
                    />
                </View>
                <View className="space-y-2">
                    <Text className="text-base">Save address as:</Text>
                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            onPress={() => handlePress('Home')}
                            style={{
                                borderColor: selectedButton === 'Home' ? themeColors.text : 'gray',
                            }}
                            className="bg-gray-100 border p-1 px-4 rounded-lg"
                        >
                            <Text style={{color: selectedButton === 'Home' ? themeColors.text : 'black'}}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePress('Work')}
                            style={{
                                borderColor: selectedButton === 'Work' ? themeColors.text : 'gray',
                            }}
                            className="bg-gray-100 border p-1 px-4 rounded-lg"
                        >
                            <Text style={{color: selectedButton === 'Work' ? themeColors.text : 'black'}}>Work</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePress('')}
                            style={{
                                borderColor: selectedButton === '' ? themeColors.text : 'gray',
                            }}
                            className="bg-gray-100 border p-1 px-4 rounded-lg"
                        >
                            <Text style={{color: selectedButton === '' ? themeColors.text : 'black'}}>Other</Text>
                        </TouchableOpacity>
                    </View>
                    {showTextField && (
                        <TextInput
                            className="bg-gray-100 p-2 rounded-lg h-12"
                            placeholder="Name"
                            value={label}
                            onChangeText={setLabel}
                        />
                    )}
                </View>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="items-center p-4 rounded-full w-full"
                onPress={() => onPress(userId, streetAddress, city, state, postalCode, label)}
            >
                <Text className="text-white text-lg font-medium">SAVE</Text>
            </TouchableOpacity>

        </View>
    )
}