import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function SuccessScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/food_order_success.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subTitle}>You successfully completed the order,{'\n'}enjoy our service</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={styles.button}  
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
    },
    image: {
      width: 300,
      height: 300,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subTitle: {
      marginTop: 10,
      color: '#525C67',
      textAlign: 'center',
    },
    button: {
      backgroundColor: themeColors.text,
      padding: 15,
      borderRadius: 13,
      width: 350,
      position: 'absolute',
      bottom: 20,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
    }

})