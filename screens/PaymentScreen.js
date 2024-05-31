import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function PaymentScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 p-4">
            <BackButton value='Payments' />
            <View className="my-4">
                <Text className="text-base font-medium">Pay on Delivery</Text>
                <TouchableOpacity
                    className="flex-row  bg-white my-2 p-4 rounded-xl shadow-md"
                    onPress={() => Alert.alert("Confirm Order",
                        "Are you sure you want to confirm the order?", [
                        {
                            text: 'Cancel',
                        },
                        {
                            text: 'Confirm',
                            onPress: () => navigation.navigate('Success')
                        }
                    ],
                        { cancelable: true }
                    )}
                >
                    <FontAwesome name="rupee" size={24} color="black" />
                    <Text className="ml-4 font-medium">Pay on delivery (Cash/UPI)</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}