import { View, Text, TouchableOpacity, Alert, Button, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';


export default function PaymentScreen() {
    const navigation = useNavigation();

    const { confirmPayment } = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { subTotal } = useSelector((state) => state.cart);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/restaurants/get-csrf-token/`, {
                    withCredentials: true
                });
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                Alert.alert('Error', 'Failed to fetch CSRF token');
            }
        }
        fetchCsrfToken();
    }, []);

    useEffect(() => {
        const fetchClientSecret = async () => {
            if (!csrfToken) {
                return;
            }

            try {
                const response = await axios.post(`${BASE_URL}/restaurants/create-payment-intent/`, {
                    amount: subTotal * 100,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true
                });

                if (response.data.clientSecret) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    Alert.alert('Error', data.error);
                }

            } catch (error) {
                console.error('Error fetching client secret:', error);
                Alert.alert('Error', 'Failed to fetch client secret');
            }
        };

        fetchClientSecret();
    }, [csrfToken]);

    const handlePayPress = async () => {
        // Confirm the payment with the client secret
        const { error } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                name: name,
                email: email,
                phone: phone,
            },
        });
        if (error) {
            console.log('Payment confirmation error', error);
        } else {
            console.log('Payment successful');
        }
    };

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

            {/* Card payment */}
            <View style={styles.container}>
                <Text>Billing Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                />
                <Button onPress={handlePayPress} title="Pay" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});