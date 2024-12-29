import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function UserInfoScreen() {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton value="Profile Info" />
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile", { user })}
        >
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <View style={styles.circle}>

        </View>
        <View >
          <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.qoute}>I love fastfood</Text>
        </View>
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Icon.User width={25} height={25} stroke={themeColors.bgColor(1)} />
          </View>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.label}>FULL NAME</Text>
            <Text style={styles.value}>
              {user?.first_name} {user?.last_name}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Icon.Mail width={25} height={25} stroke={themeColors.bgColor(1)} />
          </View>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.label}>EMAIL</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconWrapper}>
            <Icon.Phone
              width={25}
              height={25}
              stroke={themeColors.bgColor(1)}
            />
          </View>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.label}>PHONE NUMBER</Text>
            <Text style={styles.value}>{user?.phone_number}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editText: {
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 16,
    color: themeColors.bgColor(1),
  },
  profile: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginVertical: 25,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: themeColors.bgColor(0.3),
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181C2E",
    marginBottom: 5,
  },
  qoute: {
    fontSize: 14,
    color: "#A0A5BA",
    fontWeight: "400",
  },
  infoCard: {
    backgroundColor: "#F6F8FA",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
  infoTextWrapper: {
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
  },
  value: {
    color: "#6B7280",
    fontSize: 14,
  },
});
