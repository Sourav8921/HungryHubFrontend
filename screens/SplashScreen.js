import { SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";

const logoImg = require("../assets/Logo.png");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#294C25",
    alignItems: "center",
    justifyContent: "center",
  },
});
