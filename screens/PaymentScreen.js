import { View, Text, TouchableOpacity, Alert, Button, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { getClientSecret, getCsrfToken } from '../services/api';
import { submitOrder } from '../redux/cart';
import Loading from '../components/Loading';


export default function PaymentScreen() {
    const navigation = useNavigation();

    //Payment
    const [clientSecret, setClientSecret] = useState('');
    const { confirmPayment } = useStripe();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //order submission
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const userId = user.id;
    const { cartList, subTotal, orderStatus, orderError } = useSelector((state) => state.cart);
    const restaurantId = cartList.length > 0 ? cartList[0].restaurant : null;

    //payment
    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const csrfData = await getCsrfToken();

                const clientSecretData = await getClientSecret(csrfData, subTotal);
                setClientSecret(clientSecretData.clientSecret);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };
        fetchTokens();
    }, []);

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
            handleOrderSubmit()
        };
    };

    //order submission
    const handleOrderSubmit = () => {
        if (restaurantId) {
            const orderDetails = {
                user: userId,
                restaurant: restaurantId,
                items: cartList.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    restaurant: item.restaurant,
                    count: item.count,
                })),
                total_price: subTotal,
                status: "Pending",
            };
            dispatch(submitOrder(orderDetails));
        }
    };

    if (orderStatus === 'succeeded') {
        navigation.navigate('Success');
    }
    if (orderStatus === 'loading') {
        return (<Loading />);
    }
    if (orderStatus === 'failed') {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-600 text-lg">Error : {orderError}</Text>
            </View>
        );
    }

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
                            onPress: () => handleOrderSubmit()
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
                <Text className="text-base font-medium">Credit & Debit Cards</Text>
                <View className="space-y-4 bg-white my-2 p-4 rounded-xl shadow-md">
                    <Text >Billing Details</Text>
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
                            number: '0000 0000 0000 0000',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 20,
                        }}
                    />
                    <Button onPress={handlePayPress} title="Pay" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});