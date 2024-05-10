import { View, Text, SafeAreaView, TextInput, ScrollView, Platform, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import RestaurantCard from '../components/RestaurantCard';
import { themeColors } from '../theme';


export default function HomeScreen({navigation}) {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API
        fetch('http://10.0.2.2:8000/api/restaurants/')
        .then((response) => response.json())
        .then((data) => {
            setRestaurants(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

return (
    <SafeAreaView
        style={{ paddingTop: Platform.OS == 'android' ? 25 : 0 }}
        className="p-4 flex-1"
    >
        <StatusBar barStyle="dark-content" />
        {/* location */}
        <View className="flex-row my-4 justify-between items-center">
            <View className="flex-row items-center">
                <Icon.MapPin width="30" height="30" stroke={themeColors.bgColor(1)} />
                <View className="ml-2">
                    <View className="flex-row font-bold items-center">
                        <Text className="font-bold text-lg">Ernakulam North</Text>
                        <Icon.ChevronDown width="25" height="25" stroke="black" />
                    </View>
                    <Text>Kathrikadavu, kaloor, Ernakulam</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate("Profile")}}>
                <Icon.User width="30" height="30" stroke={themeColors.bgColor(1)} fill={themeColors.bgColor(1)} />
            </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="flex-row ">
            <View className="flex-row flex-1 p-3 rounded-full border border-gray-300">
                <Icon.Search width="25" height="25" stroke="gray" />
                <TextInput placeholder='Restaurants' className="ml-2 flex-1" />
            </View>
        </View>

        {/* main */}
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 10,
            }}
        >
            {/* categories */}
            <Text className="mt-6 text-lg font-medium">Sourav,  what's on your mind?</Text>
            <Categories />

            {/* restaurants */}
            <Text className="mt-6 text-lg font-medium">Restaurants to explore</Text>
            {
                restaurants.map(restaurant => {
                    return (
                        <RestaurantCard
                            item={restaurant}
                            key={restaurant.id}
                        />
                    )
                })
            }
        </ScrollView>
    </SafeAreaView>
)
}



// <View style={{ flex: 1, padding: 20 }}>
//                 <FlatList
//                     data={restaurants}
//                     renderItem={({ item }) => (
//                     <RestaurantCard
//                         name={item.name}
//                         deliveryTime={item.delivery_time}
//                         cuisine={item.cuisine_type}
//                         place={item.place}
//                         image={item.image_url}
//                     />
//                     )}
//                     keyExtractor={(item) => item.id.toString()}
//                 />
//             </View>