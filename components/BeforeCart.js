import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart";

export default function BeforeCart({ item }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => dispatch(addToCart(item))}
    >
      <Text style={[styles.text, { color: themeColors.text }]}>ADD</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 112,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
