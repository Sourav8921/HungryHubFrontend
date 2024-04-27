import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { PRIMARY_COLOR } from '../colors';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantScreen({ route }) {
    const navigation = useNavigation()

    return (
        <View>
            <ScrollView>
                <View>
                    <Image
                        source={{ uri: route.params.image_url }}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 8
                        }}
                    />
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                        className="bg-white absolute top-12 left-3 p-3 rounded-full">
                        <Icon.ArrowLeft stroke={PRIMARY_COLOR} strokeWidth={3} />
                    </TouchableOpacity>

                    <View
                        style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
                        className="bg-white -mt-12 pt-6"
                    >
                        <View className="flex-row justify-between mx-4">
                            <View>
                                <Text className="text-2xl font-bold">{route.params.name}</Text>
                                <View className="flex-row">
                                    <Text className="font-medium text-base">{route.params.delivery_time} mins</Text>
                                    <Text className="font-medium text-base"> - {route.params.place} </Text>
                                </View>
                                <Text>{route.params.cuisine_type}</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Image source={require("../assets/images/star.png")}/>
                                    <Text className="font-bold text-base ml-1">4.2</Text>
                                </View>
                                <Text>5k+ ratings</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}