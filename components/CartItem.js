import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
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

        {/* <View className="bg-white border rounded-full flex-row justify-around p-2 gap-x-3">
        <TouchableOpacity>
            <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
        </TouchableOpacity>
        <Text>{item.count}</Text>
        <TouchableOpacity>
            <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
        </TouchableOpacity>
        </View> */}
        <AfterCart productID={item.id} cartCount={item.count}/>
    </View>
  )
}