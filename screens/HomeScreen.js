import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import RestaurantCard from '../components/RestaurantCard';
import { themeColors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../redux/restaurants';
import Loading from '../components/Loading';
import CartIcon from '../components/CartIcon';
import { fetchUser } from '../redux/user';
import axios from 'axios';
import { BASE_URL } from '../config';
import SearchBar from '../components/SearchBar';

export default function HomeScreen({navigation}) {
    
    const [menuItems, setMenuItems] = useState([]);
    const dispatch = useDispatch();
    const {loading, restaurants, error} = useSelector((state) => state.restaurants)
    const {cartList} = useSelector((state) => state.cart)
    
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/restaurants/menu-items/list/`);
            setMenuItems(response.data);
        } catch (error) {
            console.log('Error fetching menu items', error);
        }
    };
    
    useEffect(() => {
        dispatch(fetchRestaurants())
        dispatch(fetchUser())
        fetchMenuItems()
    }, [])
    
    if(loading) {
        return (
            <Loading/>
        );
    }
    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-600 text-lg">Error : {error}</Text>
            </View>
        );
    }

    const searchMenuItems = async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/restaurants/search/?q=${query}`);
            navigation.navigate('Search',{ 'results' : response.data.results });
        } catch (error) {
            console.log(error);
        }
    }

return (
    <SafeAreaView
        className="p-4 flex-1"
    >
        <StatusBar hidden/>
        <View className="flex-1">
            {cartList.length > 0 ? <CartIcon/> : null}

            {/* location */}
            <View className="flex-row mb-3 justify-between items-center">
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

            <SearchBar onSearch={searchMenuItems}/>

            {/* main */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 10,
                }}
            >
                {/* categories */}
                <Text className="mt-6 text-lg font-medium">Sourav,  what's on your mind?</Text>
                <Categories menuItems={menuItems} onSearch={searchMenuItems}/>

                {/* restaurants */}
                <Text className="mt-3 text-lg font-medium">Restaurants to explore</Text>
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
        </View>
    </SafeAreaView>
)
}

