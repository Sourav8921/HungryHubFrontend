import { View, Text, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import AfterCart from './AfterCart';

export default function CartItem({item}) {
  return (
    <View className="flex-row bg-white shadow-md m-2 p-4 rounded-3xl items-center justify-between">
        <Image 
            source={{ uri: item?.image }} 
            style={{
                height: 60, 
                width: 60,
                borderRadius: 50,
                backgroundColor: 'white'
            }}
        />
        <View className=" flex-1 ml-4">
            <Text className="font-bold text-base">{item.name}</Text>
            <Text className="font-medium text-base">₹ {item.price}</Text>
        </View>

        <View className="items-center">
          <AfterCart productID={item.id} cartCount={item.count}/>
          <Text className="text-base font-medium">₹ {parseInt(item.price) * item.count}</Text>
        </View>
    </View>
  )
}