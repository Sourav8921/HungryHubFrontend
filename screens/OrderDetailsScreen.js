import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../services/api";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getOrderDetails(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <Loading />;
  }

  const currentStatus = order.status;
  const statuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];
  //Created styles for active and inactive states.
  // Update State Based on Order Status
  const getStatusStyle = (status) => {
    if (status === currentStatus) {
      return styles.activeStatus;
    }
    return styles.inactiveStatus;
  };
  const getCircleStyle = (status) => {
    if (status === currentStatus) {
      return styles.activeCircle;
    }
    return styles.inactiveCircle;
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <BackButton value="Orders" />
      <View className="mt-5 flex-1">
        <View className="flex-row gap-4">
          <Image
            className="w-16 h-16 rounded-xl"
            source={{ uri: order?.restaurant?.image }}
          />
          <View>
            <Text className="font-medium text-lg">
              {order?.restaurant?.name}
            </Text>
            <Text className="text-gray-400 border-b border-gray-300">
              Ordered at {new Date(order?.created_at).toLocaleString()}
            </Text>
          </View>
        </View>

        <View className="mt-2">
          <Text className="font-medium text-lg border-b border-gray-300 my-2 py-2">Your Order</Text>
          {/* <View className="border-b border-gray-300 w-full my-2" /> */}
          {order.items.map((item, index) => {
            return (
              <View key={index}>
                <Text className="font-medium">{item.menu_item.name}</Text>
                <View className="flex-row justify-between">
                  <Text className="">
                     {item.count} x {item.menu_item.price}
                  </Text>
                  <Text className="font-medium">
                    ₹ {item.count * item.menu_item.price}
                  </Text>
                </View>
              </View>
            );
          })}
          {/* <View className="border-b border-gray-300 w-full my-2" /> */}
          <View className="flex-row justify-between border-y py-2 border-gray-300 my-2">
            <Text className="font-medium text-lg">Grand total</Text>
            <Text className="font-medium text-lg">₹ {order?.total_price}</Text>
          </View>
        </View>

        <View className="items-center mt-4">
          <Text className="text-3xl font-black">
            {order.restaurant.delivery_time} min
          </Text>
          <Text className="text-gray-400">ESTIMATED DELIVERY TIME</Text>
        </View>

        {/* Order Status Tracker */}
        <View style={styles.container}>
          {statuses.map((status, index) => (
            <View key={index} style={styles.statusContainer}>
              <View style={styles.circleContainer}>
                <View style={[styles.circle, getCircleStyle(status)]}></View>
                {/* this conditional rendering is used to render a line between each status except
                                the last one */}
                {index < statuses.length - 1 && (
                  <View style={styles.line}></View>
                )}
              </View>
              <Text style={getStatusStyle(status)}>{status}</Text>
            </View>
          ))}
        </View>
        <View className="absolute bottom-2 w-full">
          <CustomButton
            onPress={() => navigation.navigate("Home")}
            title="Go to Home"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  statusContainer: {
    flexDirection: "row",
  },
  circleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  activeStatus: {
    color: themeColors.bgColor(0.9),
    fontWeight: "bold",
  },
  inactiveStatus: {
    color: "gray",
  },
  activeCircle: {
    backgroundColor: themeColors.bgColor(0.9),
    fontWeight: "bold",
  },
  inactiveCircle: {
    backgroundColor: "gray",
  },
  line: {
    width: 2,
    height: 35,
    backgroundColor: "gray",
  },
});
