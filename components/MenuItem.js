import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BeforeCart from './BeforeCart';
import AfterCart from './AfterCart';

export default function MenuItem({ item }) {
  const {cartList} = useSelector((state) => state.cart)

  // const cartCount = useMemo(()=> {
  //   return cartList?.find((cartItem) => cartItem?.id === item?.id )?.count
  // }, [cartList]);
  console.log(cartList, '==cart list');
  const cartCount = cartList?.find((cartItem) => cartItem?.id === item?.id )?.count
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = isExpanded ? 100 : 2;
  return (
    <View>
      <View className="flex-row justify-between gap-x-2">
        <View className="flex-1 gap-y-1">
          <Text className="text-lg font-medium">{item?.name}</Text>
          <Text>$ {item?.price}</Text>
          <View className="flex-row">
            <Image source={require('../assets/images/star.png')} />
            <Text className="ml-1 font-semibold">4.2 (5k+)</Text>
          </View>
          <Text numberOfLines={maxLines} ellipsizeMode="tail">
            {item?.description}
          </Text>
          {item.description.length > maxLines && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text>{isExpanded ? 'Less' : 'More'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Image
            source={{ uri: item?.image }}
            style={{
              width: 150,
              height: 130,
              borderRadius: 8,
            }}
          />
          {cartCount > 0 ? <AfterCart cartCount={cartCount}/> : <BeforeCart item={item}/> }
        </View>
      </View>
      <View className="border-b border-gray-300 w-full my-4" />
    </View>
  )
}