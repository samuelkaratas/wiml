import React from "react";

import { View, Text, StyleSheet } from "react-native";

const QuestionBox = ({question}) => (
  <View style={styles.container}>
    <Text style={styles.questionText}>{question}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 300,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  questionText: {
    color: "white",
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 50,
  },
});

export default QuestionBox;
