import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';


export default function BackButton({value}) {
    const navigation = useNavigation();
    return (
        <View className="flex-row items-center">
            <TouchableOpacity
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={() => navigation.goBack()}
                className="p-3 rounded-full">
                <Icon.ArrowLeft stroke={'white'} strokeWidth={3} />
            </TouchableOpacity>
            <Text className="text-lg font-medium ml-4">{value}</Text>
        </View>
    )
}