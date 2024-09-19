import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart";

export default function BeforeCart({ item }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      className="p-1 border border-gray-400 rounded-lg items-center mt-2 w-28"
      onPress={() => dispatch(addToCart(item))}
    >
      <Text style={{ color: themeColors.text }} className="font-bold text-lg">
        ADD
      </Text>
    </TouchableOpacity>
  );
}
