import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import RestaurantCard from '../components/RestaurantCard';
import BackButton from '../components/BackButton';



export default function SearchScreen() {
    const route = useRoute();
    const { results } = route.params;

    return (
        <View style={styles.container}>
            <BackButton value='Search'/>
            <View style={styles.restaurantsCont}>
                <Text style={styles.text}>Search results</Text>
                {results.map((restaurant, index) => (
                    <RestaurantCard item={restaurant} key={index} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20
    },
    restaurantsCont: {
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    }
})
