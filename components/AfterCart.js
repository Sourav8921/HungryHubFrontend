import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux/cart";

export default function AfterCart({ cartCount, productID }) {
  const dispatch = useDispatch();
  return (
    <View>
      <View className="border border-gray-400 rounded-lg  items-center mt-2 w-28 flex-row justify-around">
        <TouchableOpacity
          className="p-2"
          onPress={() => dispatch(decrement(productID))}
        >
          <Icon.Minus
            width={20}
            height={20}
            stroke={themeColors.bgColor(1)}
            strokeWidth={4}
          />
        </TouchableOpacity>

        <Text className="font-medium text-lg">{cartCount}</Text>

        <TouchableOpacity
          className="p-2"
          onPress={() => dispatch(increment(productID))}
        >
          <Icon.Plus
            width={20}
            height={20}
            stroke={themeColors.bgColor(1)}
            strokeWidth={4}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
