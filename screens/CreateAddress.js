import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import AddressForm from "../components/AddressForm";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../axiosConfig";

export default function CreateAddress() {
  const navigation = useNavigation();

  const createAddress = async (
    userId,
    streetAddress,
    city,
    state,
    postalCode,
    label
  ) => {
    try {
      const response = await api.post(`/api/users/delivery-addresses/`, {
        user: userId,
        street_address: streetAddress,
        city,
        state,
        postal_code: postalCode,
        address_label: label,
      });
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
        <BackButton value={"Add address"} />
        <AddressForm onPress={createAddress} />
      </View>
    </SafeAreaView>
  );
}