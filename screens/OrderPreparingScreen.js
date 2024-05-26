import { View, Image } from 'react-native'
import React, { useEffect } from 'react'

export default function OrderPreparingScreen({navigation}) {
    useEffect(() => {
       setTimeout(() =>{
            navigation.navigate("Success")
       }, 3000)
    }, [])

    return (
        <View className="bg-white flex-1 justify-center items-center">
            <Image style={{ width: 400, height: 400 }} source={require('../assets/images/home-delivery-man.gif')} />
        </View>
    )
}