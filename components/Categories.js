import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'


export default function Categories({ menuItems, onSearch }) {
    // used to filter duplicate menu items
    const uniqueMenuItems = [];
    const seenNames = new Set();

    menuItems.forEach(item => {
        if (!seenNames.has(item.name)) {
            uniqueMenuItems.push(item);
            seenNames.add(item.name);
        }
    });

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
                    uniqueMenuItems.map((item, index) => {
                        return (
                            <View key={index} className="flex justify-center items-center mr-5">
                                <TouchableOpacity
                                    onPress={() => onSearch(item.name)}
                                    className="border rounded-full">
                                    <Image style={{ width: 70, height: 70, borderRadius: 50 }}
                                        source={{ uri: item?.image }} />
                                </TouchableOpacity>
                                <Text className="font-medium pt-1 text-gray-600">{item?.name}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}