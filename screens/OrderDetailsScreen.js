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
    <SafeAreaView style={styles.safeArea}>
      <BackButton value="Orders" />
      <View style={styles.mainContent}>
        <View style={styles.orderHeader}>
          <Image
            style={styles.image}
            source={{ uri: order?.restaurant?.image }}
          />
          <View>
            <Text style={styles.restaurantName}>{order?.restaurant?.name}</Text>
            <Text style={styles.orderDate}>
              Ordered at {new Date(order?.created_at).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.orderSection}>
          <Text style={styles.orderTitle}>Your Order</Text>
          {order.items.map((item, index) => (
            <View key={index}>
              <Text style={styles.menuItemName}>{item.menu_item.name}</Text>
              <View style={styles.itemDetails}>
                <Text>
                  {item.count} x {item.menu_item.price}
                </Text>
                <Text style={styles.itemPrice}>
                  ₹ {item.count * item.menu_item.price}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Grand total</Text>
            <Text style={styles.totalLabel}>₹ {order?.total_price}</Text>
          </View>
        </View>

        <View style={styles.deliveryTimeContainer}>
          <Text style={styles.deliveryTimeText}>
            {order.restaurant.delivery_time} min
          </Text>
          <Text style={styles.estimatedDeliveryText}>
            ESTIMATED DELIVERY TIME
          </Text>
        </View>

        {/* Order Status Tracker */}
        <View style={styles.container}>
          {statuses.map((status, index) => (
            <View key={index} style={styles.statusContainer}>
              <View style={styles.circleContainer}>
                <View style={[styles.circle, getCircleStyle(status)]}></View>
                {index < statuses.length - 1 && (
                  <View style={styles.line}></View>
                )}
              </View>
              <Text style={getStatusStyle(status)}>{status}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
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
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  mainContent: {
    marginTop: 20,
    flex: 1,
  },
  orderHeader: {
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  restaurantName: {
    fontWeight: "500",
    fontSize: 18,
  },
  orderDate: {
    color: "#9CA3AF", 
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },
  orderSection: {
    marginTop: 8,
  },
  orderTitle: {
    fontWeight: "500",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    marginVertical: 8,
    paddingBottom: 8,
  },
  menuItemName: {
    fontWeight: "500",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemPrice: {
    fontWeight: "500",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 8,
    marginVertical: 8,
  },
  totalLabel: {
    fontWeight: "500",
    fontSize: 18,
  },
  deliveryTimeContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  deliveryTimeText: {
    fontSize: 36,
    fontWeight: "900",
  },
  estimatedDeliveryText: {
    color: "#9CA3AF", 
  },
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
  buttonContainer: {
    position: "absolute",
    bottom: 8,
    width: "100%",
  },
});
