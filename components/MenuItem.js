import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BeforeCart from './BeforeCart';
import AfterCart from './AfterCart';

export default function MenuItem({ item }) {
  const {cartList} = useSelector((state) => state.cart)

  //find() returns the value of the first element in an array that passes a test (provided by a function)
  //and i am taking the count property of that item
  const cartCount = useMemo(()=> {
    return cartList?.find((cartItem) => cartItem?.id === item?.id )?.count
  }, [cartList]);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = isExpanded ? 100 : 2;
  return (
    <View>
      <View className="flex-row justify-between gap-x-2">
        <View className="flex-1 gap-y-1">
          <Text className="text-lg font-medium">{item?.name}</Text>
          <Text >₹ {item?.price}</Text>
          <View className="flex-row">
            <Image source={require('../assets/images/star.png')} />
            <Text className="ml-1 font-semibold">4.2 (5k+)</Text>
          </View>
          <Text className="text-gray-600" numberOfLines={maxLines} ellipsizeMode="tail">
            {item?.description}
          </Text>
          {item.description.length > maxLines && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text>{isExpanded ? 'Less' : 'More'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="justify-center items-center">
          <Image
            source={{ uri: item?.image }}
            style={{
              width: 150,
              height: 130,
              borderRadius: 8,
            }}
          />
          {cartCount > 0 ? <AfterCart productID={item.id} cartCount={cartCount}/> : <BeforeCart item={item}/> }
        </View>
      </View>
      <View className="border-b border-gray-300 w-full my-4" />
    </View>
  )
}