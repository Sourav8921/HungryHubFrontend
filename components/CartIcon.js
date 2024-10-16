import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const { cartList, subTotal } = useSelector((state) => state.cart);
  const totalCartCount = cartList.reduce(
    (total, currValue) => (total += currValue.count),
    0
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={styles.button}
      >
        <View style={styles.cartCountContainer}>
          <Text style={styles.text}>{totalCartCount}</Text>
        </View>
        <Text style={[styles.text, styles.flexText]}>View Cart</Text>
        <Text style={styles.text}>₹ {subTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute", 
    bottom: 20, 
    width: "100%",
    zIndex: 50, 
  },
  button: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 50, 
    marginHorizontal: 8,
    padding: 12, 
    paddingRight: 16, 
    backgroundColor: themeColors.bgColor(1)
  },
  cartCountContainer: {
    borderRadius: 50, 
    padding: 8, 
    paddingHorizontal: 16, 
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600", 
  },
  flexText: {
    flex: 1, 
    textAlign: "center",
  },
});