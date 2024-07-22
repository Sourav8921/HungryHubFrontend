import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setQuery(""); // Reset query when the screen is focused
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View className="flex-row ">
      <View className="flex-row flex-1 p-3 rounded-full border border-gray-300">
        <TextInput
          placeholder="Search for food..."
          className="ml-2 flex-1"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => onSearch(query)}
        />
        <TouchableOpacity onPress={() => onSearch(query)}>
          <Icon.Search width="25" height="25" stroke="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
