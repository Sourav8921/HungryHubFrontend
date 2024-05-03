import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR } from '../colors'

export default function CartIcon() {
  return (
    <View className="absolute bottom-5 w-full z-50">
        <TouchableOpacity 
            style={{backgroundColor: PRIMARY_COLOR}}
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