import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import AddressForm from "../components/AddressForm";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../axiosConfig";

export default function UpdateAddress() {
  const navigation = useNavigation();
  const route = useRoute();
  const { address } = route.params;

  const updateAddress = async (
    userId,
    streetAddress,
    city,
    state,
    postalCode,
    label
  ) => {
    try {
      const response = await api.put(
        `/api/users/delivery-addresses/${address.id}/`,
        {
          user: userId,
          street_address: streetAddress,
          city,
          state,
          postal_code: postalCode,
          address_label: label,
        }
      );
      if (response.data) {
        navigation.navigate("Address");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BackButton value={"Edit Address"} />
        <AddressForm onPress={updateAddress} address={address} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  content: {
    flex: 1,
  },
});
