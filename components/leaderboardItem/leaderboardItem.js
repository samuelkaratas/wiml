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

    let timer1 = setTimeout(() => {
      setAnimate(false);
    }, 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

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
