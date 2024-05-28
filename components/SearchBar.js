import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Icon from "react-native-feather";

export default function SearchBar({onSearch}) {
    const [query, setQuery] = useState('');
  return (
    <View className="flex-row ">
        <View className="flex-row flex-1 p-3 rounded-full border border-gray-300">
            <TextInput 
                placeholder='Restaurants' 
                className="ml-2 flex-1" 
                value={query}
                onChangeText={setQuery}
            />
            <TouchableOpacity onPress={() => onSearch(query)}>
                <Icon.Search width="25" height="25" stroke="gray" />
            </TouchableOpacity>
        </View>
    </View>
  )
}