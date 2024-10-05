import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { setIsAuth } from "../redux/auth";
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      dispatch(setIsAuth(false))
      store.dispatch({ type: "USER_LOGOUT" }); //dispatching action for clearing redux state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
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
              <Icon.ShoppingBag 
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
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
              handleLogout();
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
    </SafeAreaView>
  );
}
