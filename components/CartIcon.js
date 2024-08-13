import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import { useDispatch, useSelector } from 'react-redux';

export default function CartIcon() {
  const {cartList, subTotal} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalCartCount = cartList.reduce((total, currValue)=> (total += currValue.count), 0)

  const navigation = useNavigation()
  return (
    <View className="flex-1 absolute bottom-5 w-full z-50">
        <TouchableOpacity 
            onPress={() => {
              navigation.navigate('Cart')
            }}
            style={{backgroundColor: themeColors.bgColor(1)}}
            className="flex-row items-center justify-center rounded-full mx-2 p-3 pr-4"
        >
            <View className="rounded-full p-2 px-5" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <Text className="text-white text-lg font-semibold">{totalCartCount}</Text>
            </View>
            <Text className="text-white text-lg font-semibold flex-1 text-center">View Cart</Text>
            <Text className="text-white text-lg font-semibold">₹ {subTotal}</Text>
        </TouchableOpacity>
    </View>
  )
}