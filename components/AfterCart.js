import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/cart';

export default function AfterCart({cartCount}) {
    const dispatch = useDispatch()
    return (
        <View>
            <View className="bg-white border rounded-xl flex-row justify-around p-2 items-center mt-2">
                <TouchableOpacity onPress={()=> dispatch(decrement())}>
                    <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4} />
                </TouchableOpacity>

                <Text className="font-medium text-base">{cartCount}</Text>

                <TouchableOpacity onPress={()=> dispatch(increment())}>
                    <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4} />
                </TouchableOpacity>
            </View>
        </View>
    )
}