import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import * as Icon from "react-native-feather";
import { PRIMARY_COLOR } from '../colors';

export default function MenuItem({item}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = isExpanded ? 100 : 2;
  return (
      <View className="">
          <View className="flex-row justify-between gap-x-2">
            <View className="flex-1 gap-y-1">
              <Text className="text-lg font-medium">{item.name}</Text>
              <Text>$ {item.price}</Text>
              <View className="flex-row">
                    <Image source={require('../assets/images/star.png')} />
                    <Text className="ml-1 font-semibold">4.2 (5k+)</Text>
              </View>
              <Text numberOfLines={maxLines} ellipsizeMode="tail">
                {item.description}
              </Text>
              {item.description.length > maxLines && (
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text>{isExpanded ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            )}
            </View>
            <View>
              <Image 
                source={{ uri: item.image_url }}
                style={{
                  width: 150,
                  height: 130,
                  borderRadius: 8,
                }}
                />
                <View className="bg-white border rounded-lg flex-row justify-around p-2">
                  <TouchableOpacity className="">
                    <Icon.Minus width={20} height={20} stroke={PRIMARY_COLOR} strokeWidth={4}/>
                  </TouchableOpacity>
                  <Text>2</Text>
                  <TouchableOpacity className="">
                    <Icon.Plus width={20} height={20} stroke={PRIMARY_COLOR} strokeWidth={4}/>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
          <View className="border-b border-gray-300 w-full my-4"/>
      </View>
  )
}