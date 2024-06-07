import { View, Text } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

export default function NoOrdersScreen() {
    const navigation = useNavigation();
  return (
    <View className="flex-1 p-4">
        <View className="justify-center items-center flex-1 space-y-3">
            <Icon.ShoppingCart width="100" height="100" stroke="gray" />
            <Text className="text-center text-2xl font-normal">No orders yet</Text>
            <Text className="text-center text-base text-gray-400">Hit the green button down below to Create and order</Text>
        </View>
        <View>
            <CustomButton title='Start ordering' onPress={() => navigation.navigate('Home')}/>
        </View>
    </View>
  )
}