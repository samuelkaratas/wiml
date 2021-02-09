import React, { useEffect, useState } from "react";

import { Animated, Easing, Image, Text, StyleSheet, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

const RotateView = (props) => {
  let rotateValueHolder = new Animated.Value(0);
  const [animate, setAnimate] = useState(true);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (animate) {
        startImageRotateFunction();
      } else {
        Animated.timing(rotateValueHolder, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  useEffect(() => {
    startImageRotateFunction();

    setTimeout(() => {
      setAnimate(false);
    }, 2000);

    return function cleanup() {
      setAnimate(false);
    };
  });

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-80deg"],
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ rotate: RotateData }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const LeaderboardItem = ({ username, score, isDrinking }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/user-profile2.webp")}
        />
      </View>
      {isDrinking ? (
        <RotateView>
          <Entypo name="drink" size={24} color="red" />
        </RotateView>
      ) : null}
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    borderColor: "grey",
    borderWidth: 1,
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
  },
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
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
