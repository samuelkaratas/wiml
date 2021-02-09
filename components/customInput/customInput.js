import React from "react";

import { TextInput, StyleSheet } from "react-native";

const CustomInput = (props) => (
  <TextInput
    {...props}
    style={styles.input}
    placeholder={props.placeholder}
    onChangeText={(text) => props.onChangeText(text)}
    value={props.value}
    maxLength={10}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});

export default CustomInput;
