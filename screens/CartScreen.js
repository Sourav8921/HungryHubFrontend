import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { PRIMARY_COLOR } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import { restaurants } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
    const restaurant = restaurants[0]
    const navigation = useNavigation()
  return (
    <SafeAreaView className="bg-white flex-1">
        <StatusBar />
        
        {/* Back button */}
        <View>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                style={{backgroundColor: themeColors.bgColor(1)}}
                className="absolute z-50 left-3 p-3 rounded-full"
            >
                <Icon.ArrowLeft stroke={'white'} strokeWidth={3} />
            </TouchableOpacity>
            <View>
                <Text className="text-center font-bold text-xl">Your cart</Text>
                <Text className="text-center text-gray-500">{restaurant.name}</Text>  
            </View>
        </View>

        {/* delivery time */}
        <View 
            style={{backgroundColor: themeColors.bgColor(0.2)}}  
            className="flex-row mt-2 p-4 items-center"
        >
            <Image source={require('../assets/icon.png')} className="w-16 h-16 rounded-full"/>
            <Text className="ml-4 flex-1 font-medium">Delivery in 20-30 minutes</Text>
            <TouchableOpacity>
                <Text className="font-bold" style={{color: themeColors.text}}>
                    Change
                </Text>
            </TouchableOpacity>
        </View>

        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            {
                restaurant.dishes.map((item) => {
                    return (
                        <View key={item.id} className="flex-row bg-gray-100 shadow-md m-2 p-2">
                            <Image 
                                source={{uri: item.image_url}} 
                                style={{
                                    height: 50, 
                                    width: 50,
                                    borderRadius: 8 
                                }}
                            />
                        </View>
                    )
                })
            }

        </ScrollView>
        
       
    </SafeAreaView>
  )
}