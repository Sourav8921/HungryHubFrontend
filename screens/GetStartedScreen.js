import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const logoImg = require("../assets/images/getstarted-image.png");

export default function GetStartedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={logoImg} style={styles.logoImage} />
        <Text style={styles.title}>HungryHub</Text>
        <Text style={styles.subTitle}>
          The best service to fulfill your expectations
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.button}>
          <CustomButton
            onPress={() => navigation.navigate("Login")}
            title="Get Started"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signup}>
            New around here? <Text style={styles.signupTxt}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: 'center',
    flex: 1,
  },
  logoImage: {
    height: 250,
    width: 250,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    width: 300,
  },
  signup: {
    fontSize: 14,
    marginTop: 10,
  },
  signupTxt: {
    color: "#58AD53",
    fontSize: 14,
    fontWeight: "600",
  },
});
