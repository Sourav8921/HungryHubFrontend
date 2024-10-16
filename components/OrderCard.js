import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { deleteOrder } from "../services/api";

export default function OrderCard({ orders }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.orderContainer}>
          <View style={styles.orderHeader}>
            <Image
              style={styles.image}
              source={{ uri: item?.restaurant?.image }}
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item?.restaurant.name}</Text>
              <Text style={styles.priceText}>
                Total Price: ₹{item.total_price}
              </Text>
              <Text>{item.items.length} Items</Text>
            </View>
            <Text>#{item.id}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() =>
                navigation.navigate("OrderDetails", { orderId: item.id })
              }
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
            {item.status === "Pending" ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  Alert.alert(
                    "Cancel Order",
                    "Are you sure you want to cancel the order?",
                    [
                      { text: "No" },
                      {
                        text: "Yes",
                        onPress: () => {
                          deleteOrder(item.id);
                          alert("Order cancelled");
                          navigation.popToTop();
                        },
                      },
                    ],
                    { cancelable: true }
                  )
                }
              >
                <Text style={{ color: themeColors.text }}>Cancel</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.divider} />
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  orderContainer: {
    marginVertical: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  restaurantInfo: {
    justifyContent: "space-evenly",
    flex: 1,
    marginLeft: 16,
  },
  restaurantName: {
    fontWeight: "500",
  },
  priceText: {
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  trackButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: themeColors.bgColor(1),
  },
  trackButtonText: {
    color: "white",
  },
  cancelButton: {
    padding: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: themeColors.text,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    width: "100%",
  },
});
