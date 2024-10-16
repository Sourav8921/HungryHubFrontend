import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CustomButton from "../components/CustomButton";

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartList, subTotal } = useSelector((state) => state.cart);
  const { deliveryAddress } = useSelector((state) => state.address);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon.ArrowLeft stroke={"white"} strokeWidth={3} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Your cart</Text>
          <Text style={styles.headerSubtitle}>Items</Text>
        </View>
      </View>

      {/* Delivery time */}
      <View style={styles.deliveryContainer}>
        <Image
          source={require("../assets/images/delivery.png")}
          style={styles.deliveryImage}
        />
        {Object.keys(deliveryAddress).length !== 0 ? (
          <Text style={styles.deliveryAddress}>
            Delivery at{" "}
            <Text style={styles.deliveryAddressBold}>
              {deliveryAddress.street_address}, {deliveryAddress.city},{" "}
              {deliveryAddress.postal_code}
            </Text>
          </Text>
        ) : (
          <Text style={styles.selectAddressText}>Select delivery address</Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Address")}>
          <Text style={styles.changeButton}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.itemsAddedText}>ITEM(S) ADDED</Text>

        {cartList.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </ScrollView>

      {/* Totals */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsText}>Sub total</Text>
          <Text style={styles.totalsText}>₹ {subTotal}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsText}>Delivery Fee</Text>
          <Text style={styles.totalsText}>₹ 0</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.orderTotalText}>Order Total</Text>
          <Text style={styles.orderTotalText}>₹ {subTotal}</Text>
        </View>
        <View>
          {Object.keys(deliveryAddress).length !== 0 ? (
            <CustomButton
              title="Proceed to Pay"
              onPress={() => navigation.navigate("Payment")}
            />
          ) : (
            <CustomButton
              title="Select Address"
              onPress={() => navigation.navigate("Address")}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    marginTop: 8,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    zIndex: 50,
    left: 12,
    padding: 12,
    borderRadius: 50,
    backgroundColor: themeColors.bgColor(1),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    textAlign: "center",
    color: "#6b7280", // text-gray-500
  },
  deliveryContainer: {
    flexDirection: "row",
    marginTop: 8,
    padding: 16,
    alignItems: "center",
    backgroundColor: themeColors.bgColor(0.2),
  },
  deliveryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  deliveryAddress: {
    marginLeft: 16,
    flex: 1,
  },
  deliveryAddressBold: {
    fontWeight: "500",
  },
  selectAddressText: {
    marginLeft: 16,
    flex: 1,
    fontWeight: "500",
  },
  changeButton: {
    fontWeight: "bold",
    color: themeColors.text,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  itemsAddedText: {
    textAlign: "center",
    color: "#1f2937", // text-gray-800
    padding: 8,
  },
  totalsContainer: {
    padding: 24,
    paddingHorizontal: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 8,
    backgroundColor: themeColors.bgColor(0.2)
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalsText: {
    fontSize: 16,
  },
  orderTotalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});