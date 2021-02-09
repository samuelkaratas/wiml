import React from "react";

import { Image, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

const UserButton = ({ onPress, username }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/user-profile2.webp")}
      />
      <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  username: {
    color: "white",
    fontSize: 16,
  },
});

export default UserButton;
