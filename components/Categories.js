import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categories }) {
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
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories?.map((item) => {
          return (
            <View key={item?.id} style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => fetchRestaurants(item?.id)}
                style={styles.imageWrapper}
              >
                <Image style={styles.image} source={{ uri: item?.image }} />
              </TouchableOpacity>
              <Text style={styles.categoryName}>{item?.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  categoryContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  imageWrapper: {
    borderWidth: 1,
    borderRadius: 50,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  categoryName: {
    fontWeight: "500", 
    paddingTop: 4, 
    color: "#4B5563", 
  },
});