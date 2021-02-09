import React from "react";

import { Text, Pressable, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from "react-native";

const CustomButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    width: "80%",
    height: 50,
    borderRadius: 25,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
  },
});

export default CustomButton;
