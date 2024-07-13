import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { persistor } from "../redux/store";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.user);

  // if (!user) {
  //   return <Loading />;
  // }

  const logoutUser = async () => {
    try {
      const AUTH_TOKEN = await AsyncStorage.getItem("auth_token");
      if (!AUTH_TOKEN) {
        console.log(
          "No authentication token found. User might already be logged out."
        );
        return; // Exit function if no token is found
      }

      const config = {
        headers: {
          Authorization: `Token ${AUTH_TOKEN}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/users/logout/`,
        null,
        config
      );
      console.log("Response:", response.data);
      await AsyncStorage.removeItem("auth_token");
      navigation.navigate("Logout");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <BackButton value="Profile" />

      {/* <View className="flex-row items-center mt-8">
        <Image
          source={require("../assets/images/profilepic.png")}
          className="w-28 h-28 rounded-full"
        />
        <View className="ml-6">
          <Text className="text-2xl font-semi-bold mb-2">
            {user.first_name} {user.last_name}
          </Text>
          <Text className="text-base text-gray-800">{user.email}</Text>
        </View>
      </View> */}
      <View className="mt-4 space-y-3">
        {/* <View className="bg-white p-4 rounded-xl mt-4 space-y-1">
          <Text className="font-semibold text-lg">SOURAV RAMESH</Text>
          <Text className="text-gray-500">8921548685 ~ souravramesh39@gmail.com</Text>
          <TouchableOpacity>
            <Text style={{ color: themeColors.bgColor(1) }}>Edit Profile</Text>
          </TouchableOpacity>
        </View> */}

        <View className="bg-white p-4 rounded-xl space-y-6">
          <TouchableOpacity
            onPress={() => navigation.navigate("UserInfo")}
            className="flex-row items-center justify-between"
          >
            <View className="bg-gray-100 rounded-full p-3">
              <Icon.User
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text className="text-base">Personal info</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() => navigation.navigate("Address")}
          >
            <View className="bg-gray-100 rounded-full p-3">
              <Icon.Map
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text className="text-base">Addresses</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() => navigation.navigate("Orders")}
          >
            <View className="bg-gray-100 rounded-full p-3">
              <Ionicons
                name="fast-food-outline"
                size={25}
                color={themeColors.bgColor(1)}
              />
            </View>
            <Text className="text-base">Orders</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>
        <View className="bg-white p-4 rounded-xl">
          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() => {
              logoutUser();
              persistor.purge();
            }}
          >
            <View className="bg-gray-100 rounded-full p-3">
              <Icon.LogOut
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text className="text-base">Log out</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
