import React from "react";

import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { toggleEdit } from "../../redux/game-actions";

import { selectEdit, selectPartyId } from "../../redux/game-selectors";

import { removeUserFromFirebase } from "../../firebase/firebase";

const UserButton = ({ onPress, username, userId, admin, imageUrl }) => {
  const edit = useSelector(selectEdit);
  const partyId = useSelector(selectPartyId);

  return (
    <TouchableOpacity
      onPress={() => (!edit ? onPress() : null)}
      style={styles.container}
    >
      {edit && !admin ? (
        <Pressable
          onPress={() => removeUserFromFirebase(partyId, userId)}
          style={styles.pressable}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </Pressable>
      ) : null}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("../../assets/user-profile2.webp")
          }
        />
      </View>
      <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  pressable: {
    width: 40,
    height: 40,
    backgroundColor: "tomato",
    zIndex: 1,
    position: "absolute",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    right: -5,
    top: -5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  username: {
    color: "white",
    fontSize: 16,
  },
});

export default UserButton;
