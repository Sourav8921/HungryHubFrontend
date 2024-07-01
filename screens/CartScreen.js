import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem'
import CustomButton from '../components/CustomButton';


export default function CartScreen() {
       
    const navigation = useNavigation()
    const { cartList, subTotal } = useSelector((state) => state.cart);
    const { deliveryAddress } = useSelector((state) => state.address);

    return (
        <SafeAreaView className="bg-gray-100 flex-1">
            {/* Back button */}
            <View className="mt-2">
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    style={{backgroundColor: themeColors.bgColor(1)}}
                    className="absolute z-50 left-3 p-3 rounded-full"
                >
                    <Icon.ArrowLeft stroke={'white'} strokeWidth={3} />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">restaurant</Text>  
                </View>
            </View>

            {/* delivery time */}
            <View 
                style={{backgroundColor: themeColors.bgColor(0.2)}}  
                className="flex-row mt-2 p-4 items-center"
            >
                <Image source={require('../assets/images/delivery.png')} className="w-16 h-16 rounded-full"/>
                <Text className="ml-4 flex-1">Delivery at <Text className="font-medium">{deliveryAddress.street_address}, {deliveryAddress.city}, {deliveryAddress.postal_code}</Text></Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Address')}
                >
                    <Text className="font-bold" style={{color: themeColors.text}}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
                className="pt-4"
            >
                {/* selected menu items */}
                <Text className="text-center text-gray-800 p-2">ITEM(S) ADDED</Text>

                {cartList.map((item) => {
                    return (
                        <CartItem 
                            item={item}
                            key={item.id}
                        />
                    )

                        
                })}

            </ScrollView>
            {/* totals */}
            <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="p-6 px-8 rounded-t-3xl space-y-3">
                <View className="flex-row justify-between">
                        <Text className="text-base">Sub total</Text>
                        <Text className="text-base">₹ {subTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-base">Delivery Fee</Text>
                    <Text className="text-base">₹ 0</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-lg font-bold">Order Total</Text>
                    <Text className="text-lg font-bold">₹ {subTotal}</Text>
                </View>
                <View>
                    {deliveryAddress ? (
                        <CustomButton title='Proceed to Pay' onPress={() => navigation.navigate('Payment')}/>
                    ):(
                        <CustomButton title='Select Address' onPress={() => navigation.navigate('Address')}/>
                    )}
                </View>
            </View>
        
       
        </SafeAreaView>
  )
}