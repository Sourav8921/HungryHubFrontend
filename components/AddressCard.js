import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { deleteAddress } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetAddress, selectAddress } from "../redux/address";

export default function AddressCard({ address }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { deliveryAddress } = useSelector((state) => state.address);

  const handleSelectAddress = () => {
    dispatch(selectAddress(address));
    Alert.alert(
      "Address Selected",
      "The address has been selected.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAddress = () => {
    deleteAddress(address.id);
    //reseting delivery address state if the inside that state is deleted
    if (deliveryAddress.id === address.id) dispatch(resetAddress());
    Alert.alert(
      "Address Deleted",
      "The address has been deleted.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity onPress={handleSelectAddress}>
      <View style={styles.container}>
        <View>
          <View style={styles.iconBackground}>
            <Icon.Home width={24} height={24} stroke={themeColors.bgColor(1)} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.addressLabel}>{address.address_label}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UpdateAddress", { address })
                }
              >
                <Icon.Edit
                  width={20}
                  height={20}
                  stroke={themeColors.bgColor(1)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteAddress}>
                <Icon.Trash2
                  width={20}
                  height={20}
                  stroke={themeColors.bgColor(1)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.addressText}>
            {address.street_address}, {address.city}, {address.state}, {"\n"}
            {address.postal_code}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ECFDF5",
  },
  iconBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 12,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressLabel: {
    fontWeight: "500",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  addressText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "400",
  },
});
