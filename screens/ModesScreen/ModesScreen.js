import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

import CustomButton from "../../components/customButton/customButton";

import { useNavigation } from "@react-navigation/native";
import ModeButton from "../../components/modeButton/modeButton";

const ModesScreen = (props) => {
  const navigation = useNavigation();

  const onNormalHandler = () => {
    console.log("Normal Mode");
    navigation.navigate("Create");
  };

  const onAccordingHandler = () => {
    console.log("According To Mode");
    navigation.navigate("Create");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.notificationLabel}>Choose a Mode</Text>
        <ModeButton onPress={onNormalHandler} mode="Normal">
          According To Mode
        </ModeButton>
        <ModeButton onPress={onAccordingHandler} mode="According To">
          According To Mode
        </ModeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  notificationLabel: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 25,
  },
  hyperlinkStyle: {
    color: "blue",
    textDecorationLine: "underline",
  },
  disclaimerLabel: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 25,
  },
});

export default ModesScreen;
