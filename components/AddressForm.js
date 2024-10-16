import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { themeColors } from "../theme";
import PropTypes from "prop-types";

export default function AddressForm({ onPress, address }) {
  const [label, setLabel] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = (streetAddress, city, state, postalCode, label) => {
    const errors = {};

    if (!streetAddress) {
      errors.streetaddressError = "Street address is required.";
    } else if (streetAddress.length < 3) {
      errors.streetaddressError = "Length is too less";
    }

    if (!city) {
      errors.cityError = "City name is required";
    } else if (city.length < 3) {
      errors.cityError = "Length is too less";
    }

    if (!state) {
      errors.stateError = "State name is required";
    } else if (state.length < 3) {
      errors.stateError = "Length is too less";
    }

    if (!postalCode) {
      errors.postalError = "Postal code is required";
    } else if (postalCode.length < 3) {
      errors.postalError = "Length is too less";
    }

    if (!label) {
      errors.labelError = "Address label is required";
    } else if (label.length < 4) {
      errors.labelError = "Length is too less";
    }

    return errors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm(
      streetAddress,
      city,
      state,
      postalCode,
      label
    );
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onPress(userId, streetAddress, city, state, postalCode, label);
    } else {
      alert("Form has errors. Please correct them.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>Street Address</Text>
            <TextInput
              style={styles.input}
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
            {errors.streetaddressError && (
              <Text style={styles.errorText}>{errors.streetaddressError}</Text>
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
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
              {errors.cityError && (
                <Text style={styles.errorText}>{errors.cityError}</Text>
              )}
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
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
              {errors.stateError && (
                <Text style={styles.errorText}>{errors.stateError}</Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.label}>Postal</Text>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              keyboardType="number-pad"
              value={postalCode}
              onChangeText={setPostalCode}
              ref={fourthRef}
            />
            {errors.cityError && (
              <Text style={styles.errorText}>{errors.cityError}</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Save address as:</Text>
            <View style={styles.labelRow}>
              <TouchableOpacity
                onPress={() => handlePress("Home")}
                style={[
                  styles.button,
                  {
                    borderColor:
                      selectedButton === "Home" ? themeColors.text : "gray",
                  },
                ]}
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
                style={[
                  styles.button,
                  {
                    borderColor:
                      selectedButton === "Work" ? themeColors.text : "gray",
                  },
                ]}
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
                style={[
                  styles.button,
                  {
                    borderColor:
                      selectedButton === "" ? themeColors.text : "gray",
                  },
                ]}
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
                style={styles.input}
                placeholder="Name"
                value={label}
                onChangeText={setLabel}
              />
            )}
            {errors.labelError && (
              <Text style={styles.errorText}>{errors.labelError}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginVertical: 24,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    height: 48,
  },
  errorText: {
    color: "#EF4444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
  flexItem: {
    flex: 1,
  },
  labelRow: {
    flexDirection: "row",
    columnGap: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButton: {
    alignItems: "center",
    padding: 16,
    borderRadius: 24,
    width: "100%",
    backgroundColor: themeColors.bgColor(1),
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
});

AddressForm.propTypes = {
  onPress: PropTypes.func.isRequired,
};
