import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function BackButton({ value }) {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon.ArrowLeft stroke={"white"} strokeWidth={3} />
      </TouchableOpacity>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 12,
    borderRadius: 50, 
    backgroundColor: themeColors.bgColor(1)
  },
  text: {
    fontSize: 18,
    fontWeight: "500", 
    marginLeft: 16, 
  },
});
