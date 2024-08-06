import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/user";
import api from "../axiosConfig";

export default function EditProfileScreen() {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fname, setFname] = useState(user?.first_name);
  const [lname, setLname] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone_number);
  const [formErrors, setFormErrors] = useState({});

  const validateName = (name) => {
    return name.trim().length >= 2 && name.trim().length <= 50;
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
  };

  const handleSubmit = async () => {
    const errors = {};

    if (!validateName(fname)) {
      errors.firstName = "First name should be 2-50 characters long";
    }
    if (!validateName(lname)) {
      errors.lastName = "Last name should be 2-50 characters long";
    }
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!validatePhone(phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await api.patch(`/api/users/profile/`, {
        first_name: fname,
        last_name: lname,
        email,
        phone_number: phone,
      });
      if (response.status === 200) {
        dispatch(fetchUser());
        setFormErrors({});
        alert("Profile Updated Successfully");
        navigation.goBack();
      }
    } catch (error) {
      setFormErrors({ server: error.message });
    }
  };
  return (
    <SafeAreaView className="p-4 flex-1 bg-gray-100">
      <BackButton value={"Edit Profile"} />
      <View className="my-4">
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>First name</Text>
          <TextInput
            style={styles.inputField}
            value={fname}
            onChangeText={setFname}
            placeholder="First name"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
          />
          {formErrors.firstName && (
            <Text style={styles.errorTxt}>{formErrors.firstName}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Last name</Text>
          <TextInput
            style={styles.inputField}
            value={lname}
            onChangeText={setLname}
            placeholder="Last name"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
          />
          {formErrors.lastName && (
            <Text style={styles.errorTxt}>{formErrors.lastName}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email address</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            maxLength={30}
          />
          {formErrors.email && (
            <Text style={styles.errorTxt}>{formErrors.email}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={phone}
            onChangeText={setPhone}
            placeholder="8921548685"
            keyboardType="number-pad"
          />
          {formErrors.phone && (
            <Text style={styles.errorTxt}>{formErrors.phone}</Text>
          )}
        </View>
      </View>
      <CustomButton onPress={() => handleSubmit()} title="SAVE" />
      {formErrors.server && (
        <Text style={styles.errorTxt}>
          {formErrors.server}
          {"\n"}Please try again.
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  inputField: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorTxt: {
    color: "red",
  },
});
