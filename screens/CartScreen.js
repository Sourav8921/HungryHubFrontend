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
    const navigation = useNavigation()
  return (
    <SafeAreaView className="bg-gray-100 flex-1">
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
                <Text className="text-center text-gray-500">restaurant</Text>  
            </View>
        </View>

        {/* delivery time */}
        <View 
            style={{backgroundColor: themeColors.bgColor(0.2)}}  
            className="flex-row mt-2 p-4 items-center"
        >
            <Image source={require('../assets/images/delivery.png')} className="w-16 h-16 rounded-full"/>
            <Text className="ml-4 flex-1 font-medium">Delivery in 20-30 minutes</Text>
            <TouchableOpacity>
                <Text className="font-bold" style={{color: themeColors.text}}>
                    Change
                </Text>
            </TouchableOpacity>
        </View>

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 50
            }}
            className="pt-4"
        >
            {/* selected menu items */}
            <Text className="text-center text-gray-800 p-2">ITEM(S) ADDED</Text>
            <View className="flex-row bg-white shadow-md m-2 p-4 rounded-3xl items-center justify-between">
                <Image 
                    source={require('../assets/images/pizza-icon.png')} 
                    style={{
                        height: 60, 
                        width: 60,
                        borderRadius: 50,
                        backgroundColor: 'white'
                    }}
                />
                <View className=" flex-1 ml-4">
                    <Text className="font-bold text-base">Pizza</Text>
                    <Text className="font-medium text-base">$150</Text>
                </View>

                <View className="bg-white border rounded-full flex-row justify-around p-2 gap-x-3">
                  <TouchableOpacity>
                    <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                  <Text>2</Text>
                  <TouchableOpacity>
                    <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row bg-white shadow-md m-2 p-4 rounded-3xl items-center justify-between">
                <Image 
                    source={require('../assets/images/pizza-icon.png')} 
                    style={{
                        height: 60, 
                        width: 60,
                        borderRadius: 50,
                        backgroundColor: 'white'
                    }}
                />
                <View className=" flex-1 ml-4">
                    <Text className="font-bold text-base">Pizza</Text>
                    <Text className="font-medium text-base">$150</Text>
                </View>

                <View className="bg-white border rounded-full flex-row justify-around p-2 gap-x-3">
                  <TouchableOpacity>
                    <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                  <Text>2</Text>
                  <TouchableOpacity>
                    <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row bg-white shadow-md m-2 p-4 rounded-3xl items-center justify-between">
                <Image 
                    source={require('../assets/images/pizza-icon.png')} 
                    style={{
                        height: 60, 
                        width: 60,
                        borderRadius: 50,
                        backgroundColor: 'white'
                    }}
                />
                <View className=" flex-1 ml-4">
                    <Text className="font-bold text-base">Pizza</Text>
                    <Text className="font-medium text-base">$150</Text>
                </View>

                <View className="bg-white border rounded-full flex-row justify-around p-2 gap-x-3">
                  <TouchableOpacity>
                    <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                  <Text>2</Text>
                  <TouchableOpacity>
                    <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row bg-white shadow-md m-2 p-4 rounded-3xl items-center justify-between">
                <Image 
                    source={require('../assets/images/pizza-icon.png')} 
                    style={{
                        height: 60, 
                        width: 60,
                        borderRadius: 50,
                        backgroundColor: 'white'
                    }}
                />
                <View className=" flex-1 ml-4">
                    <Text className="font-bold text-base">Pizza</Text>
                    <Text className="font-medium text-base">$150</Text>
                </View>

                <View className="bg-white border rounded-full flex-row justify-around p-2 gap-x-3">
                  <TouchableOpacity>
                    <Icon.Minus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                  <Text>2</Text>
                  <TouchableOpacity>
                    <Icon.Plus width={20} height={20} stroke={themeColors.bgColor(1)} strokeWidth={4}/>
                  </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

        {/* totals */}
        <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="p-6 px-8 rounded-t-3xl space-y-3">
                    <View className="flex-row justify-between">
                        <Text className="text-base">Subtotal</Text>
                        <Text className="text-base">$20</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-base">Delivery Fee</Text>
                        <Text className="text-base">$2</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-lg font-bold">Order Total</Text>
                        <Text className="text-lg font-bold">$20</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={{backgroundColor: themeColors.bgColor(1)}}
                            className="items-center p-4 rounded-full"
                            onPress={() => navigation.navigate("OrderPreparing")}
                        >
                            <Text className="text-white text-lg font-medium">Place order</Text>
                        </TouchableOpacity>
                    </View>
        </View>
        
       
    </SafeAreaView>
  )
}