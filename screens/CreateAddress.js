import { StyleSheet, View } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BackButton value={"Add address"} />
        <AddressForm onPress={createAddress} />
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
