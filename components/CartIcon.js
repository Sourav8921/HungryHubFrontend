import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'

export default function CartIcon() {
  const navigation = useNavigation()
  return (
    <View className="absolute bottom-5 w-full z-50">
        <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')}
            style={{backgroundColor: themeColors.bgColor(1)}}
            className="flex-row items-center justify-center mx-3 rounded-full p-3"
        >
            <View className="rounded-full p-2 px-5" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <Text className="text-white text-lg font-semibold">3</Text>
            </View>
            <Text className="text-white text-lg font-semibold flex-1 text-center">View Cart</Text>
            <Text className="text-white text-lg font-semibold">$ 99</Text>
        </TouchableOpacity>
    </View>
  )
}