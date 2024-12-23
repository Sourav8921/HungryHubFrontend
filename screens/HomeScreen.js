import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import RestaurantCard from "../components/RestaurantCard";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../components/CartIcon";
import { fetchUser } from "../redux/user";
import axios from "axios";
import { BASE_URL } from "../config";
import SearchBar from "../components/SearchBar";
import { getRestaurants } from "../services/api/RestaurantService";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import api from "../axiosConfig";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { deliveryAddress } = useSelector((state) => state.address);
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.log("Error fetching restaurants data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/restaurants/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching menu items", error);
      }
    })();
    dispatch(fetchUser());
  }, []);

  if (loading) {
    return <Loading />;
  }

  const searchMenuItems = async (query) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/restaurants/search/?q=${query}`
      );
      navigation.navigate("Search", { results: response.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.main}>
        {cartList.length > 0 ? <CartIcon /> : null}

        {/* location */}
        <View style={styles.locationContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Address")}
            style={styles.locationButton}
          >
            <Icon.MapPin
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
            />
            {Object.keys(deliveryAddress).length !== 0 ? (
              <View style={styles.addressContainer}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressLabel}>
                    {deliveryAddress.address_label}
                  </Text>
                  <Icon.ChevronDown width={25} height={25} stroke="black" />
                </View>
                <Text>
                  {deliveryAddress.street_address}, {deliveryAddress.city},{" "}
                  {deliveryAddress.postal_code}
                </Text>
              </View>
            ) : (
              <Text style={styles.selectAddressText}>
                Select delivery address
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Icon.User
              width={30}
              height={30}
              stroke={themeColors.bgColor(1)}
              fill={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>

        <SearchBar onSearch={searchMenuItems} />

        {/* main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* categories */}
          <Text style={styles.greetingText}>
            Hello {user?.username}, what's on your mind?
          </Text>
          <Categories categories={categories} />

          {/* restaurants */}
          <Text style={styles.restaurantHeaderText}>
            Restaurants to explore
          </Text>
          {restaurants.map((restaurant) => {
            return <RestaurantCard item={restaurant} key={restaurant.id} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  main: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressContainer: {
    marginLeft: 8,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
  selectAddressText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  greetingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
  },
  restaurantHeaderText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
  },
});
