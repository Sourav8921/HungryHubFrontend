import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderFailureScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Failed to place the order. Please try again.</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
})
export default OrderFailureScreen;
