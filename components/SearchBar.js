import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="Search for food..."
          style={styles.text}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: "row",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  text: {
    flex: 1,
    // marginLeft: 8,
  },
});
