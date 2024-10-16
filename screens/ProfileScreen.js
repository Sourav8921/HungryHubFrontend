import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { setIsAuth } from "../redux/auth";
import * as SecureStore from "expo-secure-store";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      dispatch(setIsAuth(false));
      store.dispatch({ type: "USER_LOGOUT" }); //dispatching action for clearing redux state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton value="Profile" />
      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserInfo")}
            style={styles.optionButton}
          >
            <View style={styles.iconWrapper}>
              <Icon.User
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text style={styles.optionText}>Personal info</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("Address")}
          >
            <View style={styles.iconWrapper}>
              <Icon.Map
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text style={styles.optionText}>Addresses</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("Orders")}
          >
            <View style={styles.iconWrapper}>
              <Icon.ShoppingBag
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text style={styles.optionText}>Orders</Text>
            <Icon.ChevronRight
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <View style={styles.iconWrapper}>
              <Icon.LogOut
                width={25}
                height={25}
                stroke={themeColors.bgColor(1)}
              />
            </View>
            <Text style={styles.optionText}>Log out</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  content: {
    marginTop: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
});
