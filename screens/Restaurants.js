import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config';

export default function Restaurants( {route} ) {
    const { menuItemId } = route.params;
    const [restaurants, setRestaurants] = useState([]); 
    useEffect(() => {
        const fetchRestaurantsById = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/restaurants/${menuItemId}/`);
                setRestaurants(response.data);
            } catch (error) {
                console.log('Error fetching restaurants by category', error);
            }
        }
        fetchRestaurantsById()
    })
  return (
    <View>
      <FlatList
            data={restaurants}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item?.name}</Text>
                </View>
            )}
        />
    </View>
  )
}