import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import BackButton from "../components/BackButton";
import OrderCard from "../components/OrderCard";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersListScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton value="My Orders" />
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon.ShoppingCart width={100} height={100} stroke="gray" />
          <Text style={styles.noOrdersText}>No orders yet</Text>
          <Text style={styles.hintText}>
            Hit the green button down below to Create an order
          </Text>
        </View>
      ) : (
        <View style={styles.ordersContainer}>
          <OrderCard orders={orders} />
        </View>
      )}
      <CustomButton
        onPress={() => navigation.navigate("Home")}
        title="Go to Home"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
    marginVertical: 10,
  },
  hintText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  ordersContainer: {
    marginVertical: 10,
    flex: 1,
  }
});
