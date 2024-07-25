import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function UserInfoScreen() {

    const { user } = useSelector((state) => state.user);
    const navigation = useNavigation();

  return (
    <SafeAreaView className="p-4 bg-white flex-1">
        <View className="flex-row items-center justify-between">
            <BackButton value={'Profile Info'}/>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {user})}>
                <Text className="underline font-medium text-base" style={{color: themeColors.bgColor(1)}}>EDIT</Text>
            </TouchableOpacity>
        </View>
        <View className="bg-green-50 p-4 rounded-xl mt-4 space-y-6">
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.User width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>FULL NAME</Text>
                    <Text className="text-gray-500">{user?.first_name} {user?.last_name}</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.Mail width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>EMAIL</Text>
                    <Text className="text-gray-500">{user.email}</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-white rounded-full p-2">
                    <Icon.Phone width={25} height={25} stroke={themeColors.bgColor(1)} />
                </View>
                <View className="ml-4">
                    <Text>PHONE NUMBER</Text>
                    <Text className="text-gray-500">{user?.phone_number}</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}