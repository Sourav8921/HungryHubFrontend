import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import MenuItem from "../components/MenuItem";
import CartIcon from "../components/CartIcon";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { findSubTotal } from "../redux/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../axiosConfig";

export default function RestaurantScreen({ route }) {
  const navigation = useNavigation();

  // dispatching findsubtotal function from cart slice when carlist changes
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSubTotal());
  }, [cartList]);

  const { id: restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Function to fetch menu items when component mounts
    const fetchMenuItems = async () => {
      try {
        const response = await api.get(
          `/api/restaurants/menu-items/?restaurant_id=${restaurantId}`
        );
        setMenuItems(response.data); // Assuming your response data is an array of menu items
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems(); // Call the function to fetch menu items
  }, [restaurantId]); // Execute this effect whenever restaurantId changes

  return (
    <SafeAreaView style={styles.container}>
      {cartList.length > 0 ? <CartIcon /> : null}
      <StatusBar hidden />
      <ScrollView>
        <View>
          <Image source={{ uri: route.params.image }} style={styles.image} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3} />
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.restaurantName}>{route.params.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.deliveryInfo}>
                    {route.params.delivery_time} mins
                  </Text>
                  <Text style={styles.deliveryInfo}>
                    {" "}
                    - {route.params.place}{" "}
                  </Text>
                </View>
                <Text>{route.params.cuisine_type}</Text>
              </View>
              <View>
                <View style={styles.ratingContainer}>
                  <Image source={require("../assets/images/star.png")} />
                  <Text style={styles.ratingText}>4.2</Text>
                </View>
                <Text>5k+ ratings</Text>
              </View>
            </View>

            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>Menu</Text>
              {/* Menu items */}
              {menuItems.map((item) => {
                return <MenuItem item={item} key={item.id} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: "white",
    position: "absolute",
    top: 16,
    left: 12,
    padding: 12,
    borderRadius: 50,
  },
  contentContainer: {
    backgroundColor: "white",
    marginTop: -48,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  deliveryInfo: {
    fontWeight: "500",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 4,
  },
  menuContainer: {
    marginVertical: 24,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
