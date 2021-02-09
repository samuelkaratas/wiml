import React from "react";

import { View, Text, Switch, StyleSheet } from "react-native";

const CustomSwitch = ({isEnabled, toggleSwitch, children}) => (
  <View style={styles.container}>
    <Text>{children}</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CustomSwitch;
