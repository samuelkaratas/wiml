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

const ModeButton = ({ mode, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.modeText}>{mode}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.exampleText}>
          {mode === "Normal"
            ? "Who is most likely to be homeless?"
            : "Acording to Simon, who is most likely to be homeless?"}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.exampleText}>
          {mode === "Normal"
            ? "In this mode you will answer the question normally and the most votes will be the winner or loser."
            : "In this mode you have to think in Simon's perspective. What would Simon say to this question. This mode includes more strategy. If everyone guess Simon's answer Simon will be the loser. If nobody guesses Simon's answer Simon will be the loser again."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  header: {
    margin: 5,
  },
  modeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  exampleText: {
    color: "white",
    fontSize: 16,
  },
});

export default ModeButton;
