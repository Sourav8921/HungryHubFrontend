import { View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-1">
        <BackButton value={"Edit Address"} />
        <AddressForm onPress={updateAddress} address={address} />
      </View>
    </SafeAreaView>
  );
}
