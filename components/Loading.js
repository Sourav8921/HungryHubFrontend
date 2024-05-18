import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size='large' color={themeColors.text}/>
    </View>
  )
}