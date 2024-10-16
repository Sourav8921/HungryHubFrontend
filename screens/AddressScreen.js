import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { getAddresses } from "../services/api";
import AddressCard from "../components/AddressCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddressScreen() {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching Addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BackButton value="Select an address" />

        {addresses.map((address) => {
          return <AddressCard key={address.id} address={address} />;
        })}

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => navigation.navigate("CreateAddress")}
            title="Add Address"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 8,
    width: "100%",
  },
});
