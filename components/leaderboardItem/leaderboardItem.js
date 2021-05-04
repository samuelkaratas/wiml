import React from "react";

import { Image, Text, StyleSheet, View } from "react-native";

const LeaderboardItem = ({ username, score, imageUrl, isDrinking }) => {
  return (
    <View style={styles.container}>
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
      {isDrinking ? (
        <View style={styles.champContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/champion_cup.webp")}
          />
        </View>
      ) : null}
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  champContainer: {
    width: 40,
    height: 40,
    marginLeft: 5,
    borderRadius: 20,
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
    fontSize: 22,
    marginLeft: 10,
  },
  drink: {
    marginLeft: 5,
  },
  score: {
    position: "absolute",
    right: 10,
    color: "white",
    fontSize: 22,
  },
});

export default LeaderboardItem;
