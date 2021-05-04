import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

import CustomButton from "../../components/customButton/customButton";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = (props) => {
  const navigation = useNavigation();

  const onCreateHandler = () => {
    navigation.navigate("Create");
  };
  const onJoinHandler = () => {
    navigation.navigate("Join");
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.notificationLabel}>
          Choose to create a party or join an exsisting one!
        </Text>
        <CustomButton onPress={onCreateHandler}>Create</CustomButton>
        <CustomButton onPress={onJoinHandler}>Join</CustomButton>
      </View>
        <Text style={styles.disclaimerLabel}>
          If you experience any inconsistiencies or you have
          ideas to improve the app please contact us at{" "}
          <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL("mailto:whoismostlikely@gmail.com");
            }}
          >
            whoismostlikely@gmail.com
          </Text>
          . Enjoy Who Is Most Likely.
        </Text>
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
    height: 200,
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

export default HomeScreen;
