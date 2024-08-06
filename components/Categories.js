import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categories, onSearch }) {
  const navigation = useNavigation();
  const fetchRestaurants = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/restaurants/restaurants-category/?category=${id}`
      );
      navigation.navigate("Search", { results: response.data.results });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((item) => {
          return (
            <View
              key={item.id}
              className="flex justify-center items-center mr-5"
            >
              <TouchableOpacity
                onPress={() => fetchRestaurants(item.id)}
                className="border rounded-full"
              >
                <Image
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                  source={{ uri: item?.image }}
                />
              </TouchableOpacity>
              <Text className="font-medium pt-1 text-gray-600">
                {item?.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
