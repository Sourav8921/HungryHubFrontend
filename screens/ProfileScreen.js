import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../redux/store";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const { authToken } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const logoutUser = async () => {
    try {
      store.dispatch({ type: "USER_LOGOUT" }); //dispatching action for clearing redux state

      const config = {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/users/logout/`,
        null,
        config
      );
      await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <BackButton value="Profile" />
      <View className="mt-4 space-y-3">
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
