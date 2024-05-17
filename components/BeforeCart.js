import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart'

export default function BeforeCart({item}) {
    const dispatch = useDispatch()
  return (
    <View className="p-2 border rounded-xl items-center mt-2">
        <TouchableOpacity onPress={()=> dispatch(addToCart(item))}>
            <Text style={{color: themeColors.text}} className="font-bold text-base">ADD</Text>
        </TouchableOpacity>
    </View>
  )
}