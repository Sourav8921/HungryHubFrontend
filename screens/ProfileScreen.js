import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation()
  return (

        <View className="flex-1 bg-white p-4">

            <View className="pt-8 flex-row items-center">
                <TouchableOpacity
                    style={{backgroundColor: themeColors.bgColor(1)}}
                    onPress={()=> navigation.goBack()}
                    className="p-3 rounded-full">
                    <Icon.ArrowLeft stroke={'white'} strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-lg font-medium ml-4">Profile</Text>
            </View>

            <View className="flex-row items-center mt-4">
                <Image 
                    source={require('../assets/images/profilepic.png')}
                    className="w-28 h-28 rounded-full"
                />
                <View className="ml-6">
                    <Text className="text-2xl font-semi-bold mb-2">Sourav Ramesh</Text>
                    <Text className="text-base text-gray-800">I love fastfood</Text>
                </View>
            </View>

            <View className="bg-gray-100 p-4 rounded-xl mt-8">
                <View className="flex-row items-center justify-between mb-6">
                    <Icon.User width={35} height={35} stroke={themeColors.bgColor(1)}/>
                    <Text className="text-base">Personal info</Text>
                    <Icon.ChevronRight width={30} height={30} stroke={themeColors.bgColor(1)}/>
                </View>
                <View className="flex-row items-center justify-between">
                    <Icon.Map width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <Text className="text-base">Addresses</Text>
                    <Icon.ChevronRight width={30} height={30} stroke={themeColors.bgColor(1)}/>
                </View>
            </View>
            <View className="bg-gray-100 p-4 rounded-xl mt-4">
                <View className="flex-row items-center justify-between">
                    <Icon.LogOut width={35} height={35} stroke={themeColors.bgColor(1)}/>
                    <Text className="text-base">Log out</Text>
                    <Icon.ChevronRight width={30} height={30} stroke={themeColors.bgColor(1)}/>
                </View>
            </View>

        </View>
  )
}