import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AfterCart from "./AfterCart";

export default function CartItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
      </View>

      <View style={styles.cartContainer}>
        <AfterCart productID={item.id} cartCount={item.count} />
        <Text style={styles.totalPrice}>
          ₹ {parseInt(item.price) * item.count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 8,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "white",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: "500",
    fontSize: 16,
  },
  cartContainer: {
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
});