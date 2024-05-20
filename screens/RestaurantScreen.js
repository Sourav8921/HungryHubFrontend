import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../components/MenuItem';
import CartIcon from '../components/CartIcon';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import { useSelector } from 'react-redux';

export default function RestaurantScreen({ route }) {

    const {cartList} = useSelector((state) => state.cart)

    const navigation = useNavigation()

    const { id: restaurantId } = route.params;
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Function to fetch menu items when component mounts
        const fetchMenuItems = async () => {
          try {
            const response = await axios.get(`http://192.168.1.10:8000/api/restaurants/menu-items/?restaurant_id=${restaurantId}`);
            setMenuItems(response.data); // Assuming your response data is an array of menu items
          } catch (error) {
            console.error('Error fetching menu items:', error);
          }
        };
    
        fetchMenuItems(); // Call the function to fetch menu items
      }, [restaurantId]); // Execute this effect whenever restaurantId changes

    return (
        <View className="flex-1">
            <CartIcon/>
            <StatusBar hidden/>
            <ScrollView>
                <View>
                    <Image
                        source={{ uri: route.params.image }}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 8
                        }}
                        />
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                        className="bg-white absolute top-4 left-3 p-3 rounded-full">
                        <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3} />
                    </TouchableOpacity>

                    <View
                        style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
                        className="bg-white -mt-12 p-6"
                        >
                        <View className="flex-row justify-between">
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

                        <View className="my-6">
                            <Text className="text-2xl font-bold mb-4">Menu</Text>
                            {/* Menu items */}
                            
                            {menuItems.map(item => {
                                return (
                                    <MenuItem item={item} key={item.id}/>
                                )
                            })}
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}