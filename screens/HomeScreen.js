import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import RestaurantCard from "../components/RestaurantCard";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../components/CartIcon";
import { fetchUser } from "../redux/user";
import axios from "axios";
import { BASE_URL } from "../config";
import SearchBar from "../components/SearchBar";
import { getRestaurants } from "../services/api/RestaurantService";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import api from "../axiosConfig";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { deliveryAddress } = useSelector((state) => state.address);
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
      const fetchRestaurants = async () => {
        setLoading(true);
        try {
          const data = await getRestaurants();
          setRestaurants(data);
        } catch (error) {
          console.log("Error fetching restaurants data", error);
        } finally {
          setLoading(false);
        }
      }
      fetchRestaurants();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/restaurants/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching menu items", error);
      }
    })();
    dispatch(fetchUser());
  }, []);

  if (loading) {
    return <Loading />;
  }

  const searchMenuItems = async (query) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/restaurants/search/?q=${query}`
      );
      navigation.navigate("Search", { results: response.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="p-4 flex-1">
      <StatusBar />
      <View className="flex-1">
        {cartList.length > 0 ? <CartIcon /> : null}

        {/* location */}
        <View className="flex-row mb-3 justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Address")}
            className="flex-row items-center"
          >
            <Icon.MapPin
              width="30"
              height="30"
              stroke={themeColors.bgColor(1)}
            />
            {Object.keys(deliveryAddress).length !== 0 ? (
              <View className="ml-2">
                <View className="flex-row font-bold items-center">
                  <Text className="font-bold text-lg">
                    {deliveryAddress.address_label}
                  </Text>
                  <Icon.ChevronDown width="25" height="25" stroke="black" />
                </View>
                <Text>
                  {deliveryAddress.street_address}, {deliveryAddress.city},{" "}
                  {deliveryAddress.postal_code}
                </Text>
              </View>
            ) : (
              <Text className="ml-2 font-medium text-base">
                Select delivery address
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Icon.User
              width="30"
              height="30"
              stroke={themeColors.bgColor(1)}
              fill={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>

        <SearchBar onSearch={searchMenuItems} />

        {/* main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          {/* categories */}
          <Text className="mt-6 text-lg font-medium">
            Hello {user?.username}, what's on your mind?
          </Text>
          <Categories categories={categories} />

          {/* restaurants */}
          <Text className="mt-3 text-lg font-medium">
            Restaurants to explore
          </Text>
          {restaurants.map((restaurant) => {
            return <RestaurantCard item={restaurant} key={restaurant.id} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
