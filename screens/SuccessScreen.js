import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function SuccessScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Congratulations</Text>
      <Text>Your order is successful</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})