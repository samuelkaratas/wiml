import React from "react";

import { View, Pressable, Text, Image, StyleSheet } from "react-native";

const ChooseImage = ({image, onPress}) => (
  <Pressable
    onPress={onPress}
    style={styles.pressable}
  >
    <View style={styles.textContainer}>
      <Text style={styles.text}>Choose...</Text>
    </View>
    <Image
      style={styles.image}
      source={image ? {uri: image} :require("../../assets/user_placeholder.png")}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  pressable: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    zIndex: 1,
    width: 150,
    height: 120,
    opacity: 0.9,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

export default ChooseImage;
