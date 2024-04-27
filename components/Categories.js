import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../constants'


export default function Categories() {

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
                    categories.map((category, index) => {
                        return (
                            <View key={index} className="flex justify-center items-center mr-5">
                                <TouchableOpacity
                                    className="px-3 py-3 rounded-full shadow bg-gray-200">
                                    <Image style={{width: 45, height: 45}} 
                                        source={category.image} />
                                </TouchableOpacity>
                                <Text className="text-sm">{category.name}</Text>
                            </View>
                        )
                    })
                }

            </ScrollView>

        </View>
    )
}