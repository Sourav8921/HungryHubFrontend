import { SafeAreaView, View } from 'react-native'
import React from 'react'
import BackButton from '../components/BackButton'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'


export default function AddressScreen() {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="p-4 flex-1 bg-white">
        <View className="flex-1">
            <BackButton value="Select an address" />
            <View className="absolute bottom-1 w-full">
                <CustomButton onPress={()=> navigation.navigate('AddAddress')} title='Add Address'/>
            </View>
        </View>
    </SafeAreaView>
  )
}