import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={themeColors.text}/>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})