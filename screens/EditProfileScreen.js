import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { BASE_URL } from "../config";
import { getToken } from "../services/api";
import axios from "axios";

export default function EditProfileScreen() {
  const route = useRoute();
  const { user } = route.params;

  const [fname, setFname] = useState(user?.first_name);
  const [lname, setLname] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone_number);

  const handleSubmit = async () => {
    try {
      const AUTH_TOKEN = await getToken();
      const response = await axios.patch(
        `${BASE_URL}/users/profile/`,
        {
          first_name: fname,
          last_name: lname,
          email,
          phone_number: phone,
        },
        {
          headers: {
            Authorization: `Token ${AUTH_TOKEN}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="p-4 flex-1 bg-gray-100">
      <BackButton value={"Edit Profile"} />
      <View className="mt-4">
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
          {/* <Text style={styles.errorTxt}>{fnameError}</Text> */}
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
          {/* <Text style={styles.errorTxt}>{lnameError}</Text> */}
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
          {/* <Text style={styles.errorTxt}>{emailError}</Text> */}
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
          {/* <Text style={styles.errorTxt}>{emailError}</Text> */}
        </View>
      </View>
      <CustomButton onPress={() => handleSubmit()} title="SAVE" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 17,
    textAlign: "center",
    color: "grey",
  },
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
  button: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#58AD53",
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupTxt: {
    textDecorationLine: "underline",
    color: "#58AD53",
  },
});
