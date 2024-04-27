import { View, Text, SafeAreaView, TextInput, ScrollView, FlatList, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../constants';
import { PRIMARY_COLOR } from '../colors';


export default function HomeScreen() {
    // const [restaurants, setRestaurants] = useState([]);
    
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/restaurants/?format=json');
    //         const data = await response.json();
    //         setRestaurants(data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // useEffect(()=>{
    //     fetchData();
    // }, [])

  return (
    <SafeAreaView 
        style={{paddingTop: Platform.OS == 'android' ? 20 : 0}}
        className="p-4"
    >
        <StatusBar barStyle="dark-content"/>
        {/* location */}
        <View className="flex-row my-4 justify-between items-center"> 
            <View className="flex-row items-center">
                <Icon.MapPin width="30" height="30" stroke={PRIMARY_COLOR}/>
                <View className="ml-2">
                    <View className="flex-row font-bold items-center">
                        <Text className="font-bold text-lg">Ernakulam North</Text>
                        <Icon.ChevronDown width="25" height="25" stroke="black"/>
                    </View>
                    <Text>Kathrikadavu, kaloor, Ernakulam</Text>
                </View>
            </View>
            <Icon.User width="30" height="30" stroke={PRIMARY_COLOR} fill={PRIMARY_COLOR}/>
        </View>

        {/* search bar */}
        <View className="flex-row ">
            <View className="flex-row flex-1 p-3 rounded-full border border-gray-300"> 
                <Icon.Search width="25" height="25" stroke="gray" />
                <TextInput placeholder='Restaurants' className="ml-2 flex-1"/>
            </View>
        </View>

        {/* main */}
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 20,
            }}
        >
            {/* categories */}
            <Text className= "mt-6 text-lg font-medium">Sourav,  what's on your mind?</Text>
            <Categories/>

            {/* restaurants */}    
            <Text className= "mt-6 text-lg font-medium">Restaurants to explore</Text> 
            {
                restaurants.map((item)=> {
                    return (
                        <RestaurantCard key={item.id} item={item}/>
                    )
                })
            }
        </ScrollView>



        {/* <View>
        <FlatList
            data={restaurants}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.place}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
        </View> */}
    </SafeAreaView>

    
    
  )
}