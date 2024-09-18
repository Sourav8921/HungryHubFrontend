import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { themeColors } from "../theme";
import PropTypes from "prop-types";

export default function AddressForm({ onPress, address }) {
  const [label, setLabel] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);

  const handlePress = (buttonLabel) => {
    setLabel(buttonLabel);
    setShowTextField(buttonLabel === "");
    setSelectedButton(buttonLabel);
  };

  const [streetAddress, setStreetAddress] = useState(address?.street_address);
  const [city, setCity] = useState(address?.city);
  const [state, setState] = useState(address?.state);
  const [postalCode, setPostalCode] = useState(address?.postal_code);
  const { user } = useSelector((state) => state.user);
  const userId = user.id;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-6 space-y-4">
          <View>
            <Text className="text-base">Street Address</Text>
            <TextInput
              className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
              placeholder="Street Address"
              value={streetAddress}
              onChangeText={setStreetAddress}
              autoFocus={true}
              blurOnSubmit={false}
              ref={firstRef}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text;
                if (!text) return;
                secondRef.current.focus();
              }}
            />
          </View>
          <View className="flex-row justify-between space-x-2">
            <View className="flex-1">
              <Text className="text-base">City</Text>
              <TextInput
                className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                placeholder="City"
                value={city}
                onChangeText={setCity}
                blurOnSubmit={false}
                ref={secondRef}
                onSubmitEditing={(e) => {
                  const text = e.nativeEvent.text;
                  if (!text) return;
                  thirdRef.current.focus();
                }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-base">State</Text>
              <TextInput
                className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
                placeholder="State"
                value={state}
                onChangeText={setState}
                blurOnSubmit={false}
                ref={thirdRef}
                onSubmitEditing={(e) => {
                  const text = e.nativeEvent.text;
                  if (!text) return;
                  fourthRef.current.focus();
                }}
              />
            </View>
          </View>
          <View>
            <Text className="text-base">Postal</Text>
            <TextInput
              className="bg-gray-100 p-2 rounded-lg mt-2 h-12"
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              ref={fourthRef}
            />
          </View>
          <View className="space-y-2">
            <Text className="text-base">Save address as:</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => handlePress("Home")}
                style={{
                  borderColor:
                    selectedButton === "Home" ? themeColors.text : "gray",
                }}
                className="bg-gray-100 border p-1 px-4 rounded-lg"
              >
                <Text
                  style={{
                    color:
                      selectedButton === "Home" ? themeColors.text : "black",
                  }}
                >
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("Work")}
                style={{
                  borderColor:
                    selectedButton === "Work" ? themeColors.text : "gray",
                }}
                className="bg-gray-100 border p-1 px-4 rounded-lg"
              >
                <Text
                  style={{
                    color:
                      selectedButton === "Work" ? themeColors.text : "black",
                  }}
                >
                  Work
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("")}
                style={{
                  borderColor:
                    selectedButton === "" ? themeColors.text : "gray",
                }}
                className="bg-gray-100 border p-1 px-4 rounded-lg"
              >
                <Text
                  style={{
                    color: selectedButton === "" ? themeColors.text : "black",
                  }}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </View>
            {showTextField && (
              <TextInput
                className="bg-gray-100 p-2 rounded-lg h-12"
                placeholder="Name"
                value={label}
                onChangeText={setLabel}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="items-center p-4 rounded-full w-full"
          onPress={() => {
            if (
              userId &&
              streetAddress &&
              city &&
              state &&
              postalCode &&
              label
            ) {
              onPress(userId, streetAddress, city, state, postalCode, label);
            } else {
              alert("Please fill in all fields");
            }
          }}
        >
          <Text className="text-white text-lg font-medium">SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

AddressForm.propTypes = {
  onPress: PropTypes.func.isRequired,
};
