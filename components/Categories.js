import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';


export default function Categories( {menuItems} ) {
    const navigation = useNavigation()
    const handleItemClick = (id) => {
        navigation.navigate('Restaurants', { menuItemId: id });
    };

    return (
        <View className="mt-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {
                    menuItems.map((item, index) => {
                        return (
                            <View key={index} className="flex justify-center items-center mr-5">
                                <TouchableOpacity
                                    onPress={() => handleItemClick(item.id)}
                                    className="p-3 rounded-2xl shadow bg-gray-200">
                                    <Image style={{width: 60, height: 60, borderRadius: 20}} 
                                        source={{ uri: item?.image }} />
                                </TouchableOpacity>
                                <Text className="text-xs font-medium">{item?.name}</Text>
                            </View>
                        )
                    })
                }

            </ScrollView>

        </View>
    )
}