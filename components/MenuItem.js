import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BeforeCart from "./BeforeCart";
import AfterCart from "./AfterCart";

export default function MenuItem({ item }) {
  const { cartList } = useSelector((state) => state.cart);

  //find() returns the value of the first element in an array that passes a test (provided by a function)
  //and i am taking the count property of that item
  const cartCount = useMemo(() => {
    return cartList?.find((cartItem) => cartItem?.id === item?.id)?.count;
  }, [cartList]);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = isExpanded ? 100 : 2;
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text>₹ {item?.price}</Text>
          <View style={styles.ratingContainer}>
            <Image source={require("../assets/images/star.png")} />
            <Text style={styles.ratingText}>4.2 (5k+)</Text>
          </View>
          <Text
            style={styles.description}
            numberOfLines={maxLines}
            ellipsizeMode="tail"
          >
            {item?.description}
          </Text>
          {item.description.length > maxLines && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text>{isExpanded ? "Less" : "More"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.image }} style={styles.itemImage} />
          {cartCount > 0 ? (
            <AfterCart productID={item.id} cartCount={cartCount} />
          ) : (
            <BeforeCart item={item} />
          )}
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 18, 
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 4, 
    fontWeight: "600", 
  },
  description: {
    color: "#4B5563", 
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 150,
    height: 130,
    borderRadius: 8,
  },
  divider: {
    borderBottomWidth: 1, 
    borderColor: "#D1D5DB", 
    width: "100%",
    marginVertical: 16,
  },
});
