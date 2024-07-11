import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";

export default function UserInfoScreen() {
  return (
    <SafeAreaView className="p-4 bg-white flex-1">
        <View className="flex-row items-center justify-between">
            <BackButton value={'Profile Info'}/>
            <TouchableOpacity>
                <Text className="underline font-medium text-base" style={{color: themeColors.bgColor(1)}}>EDIT</Text>
            </TouchableOpacity>
        </View>
        <View className="bg-slate-100 p-4 rounded-xl mt-4 space-y-6">
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.User width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>FULL NAME</Text>
                    <Text className="text-gray-500">Sourav Ramesh</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.Mail width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>EMAIL</Text>
                    <Text className="text-gray-500">souravramesh@gmail.com</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.Phone width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>PHONE NUMBER</Text>
                    <Text className="text-gray-500">8921548685</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}