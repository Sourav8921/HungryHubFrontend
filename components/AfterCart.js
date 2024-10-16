import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux/cart";

export default function AfterCart({ cartCount, productID }) {
  const dispatch = useDispatch();
  return (
    <View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement(productID))}
        >
          <Icon.Minus
            width={20}
            height={20}
            stroke={themeColors.bgColor(1)}
            strokeWidth={4}
          />
        </TouchableOpacity>

        <Text style={styles.countText}>{cartCount}</Text>

        <TouchableOpacity
          style={styles.button}
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

const styles = StyleSheet.create({
  counterContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 112,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 8, 
  },
  countText: {
    fontWeight: "500",
    fontSize: 18, 
  },
});
