import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";

export default function SuccessScreen({ navigation }) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, [] );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/food_order_success.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subTitle}>
        You successfully completed the order,{"\n"}enjoy our service
      </Text>

      <View style={styles.button}>
        <CustomButton
          onPress={() => navigation.navigate("Orders")}
          title="Go to My Orders"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: 10,
    color: "#525C67",
    textAlign: "center",
  },
  button: {
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
});
