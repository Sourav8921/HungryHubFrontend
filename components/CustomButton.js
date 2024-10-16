import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import PropTypes from "prop-types";

export default function CustomButton({ onPress, title }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 16, 
    borderRadius: 50, 
    width: "100%",
    backgroundColor: themeColors.bgColor(1)
  },
  text: {
    color: "white", 
    fontSize: 18, 
    fontWeight: "500", 
  },
});

//ensuring props receive the correct data types and values.
CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};