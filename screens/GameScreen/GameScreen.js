import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import UserSelectionList from "../../components/userSelectionList/userSelectionList";
import LeaderboardList from "../../components/leaderboardList/leaderboardList";
import QuestionBox from "../../components/questionBox/questionBox";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import {
  setPartyIdRedux,
  setUserId,
  setIsAdmin,
  setGameStarted,
  resetUsers,
  setNumberOfPeopleAnswered,
  setShowLeaderboard,
} from "../../redux/game-actions";

import {
  selectUsers,
  selectPartyId,
  selectUserId,
  selectIsAdmin,
  selectNumberOfPeopleAnswered,
  selectShowLeaderboard,
  selectQuestionNumber,
} from "../../redux/game-selectors";

import {
  detachJoinedListener,
  detachStartedListener,
  detachAnsweredListener,
  updateNumberOfPeopleAnswered,
  setupAnsweredListener,
  updateUsers,
  resetNumberOfAnswered,
  resetScore,
  setupShowLeaderboardListener,
  changeShowLeaderboard,
  detachShowLeaderboardListener,
  updateQuestionNumber,
  setupQuestionNumberListener,
  getQuestionText
} from "../../firebase/firebase";

const GameScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const users = useSelector(selectUsers);
  const isAdmin = useSelector(selectIsAdmin);
  const partyId = useSelector(selectPartyId);
  const userId = useSelector(selectUserId);
  const showLeaderboard = useSelector(selectShowLeaderboard);
  const questionNumber = useSelector(selectQuestionNumber);

  const numOfAnswered = useSelector(selectNumberOfPeopleAnswered);

  //const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [highscore, setHighscore] = useState(null);
  const [array, setArray] = useState(null);
  const [questionText, setQuestionText] = useState(null);

  const nextClicked = async () => {
    if (isAdmin) {
      changeShowLeaderboard(partyId);
    }
  };

  const startValue = new Animated.Value(1);
  const endValue = 1.2;

  const userClicked = (item) => {
    updateNumberOfPeopleAnswered(partyId, item.key);
  };

  useEffect(() => {
    const runFunction = async () => {
      console.log("questionNumber" + questionNumber);
      const returnedObject = await getQuestionText(questionNumber);
      setQuestionText(returnedObject.questionText);
    }

    runFunction()
  }, [questionNumber]);

  useEffect(() => {
    console.log("showLeaderboard" + showLeaderboard);
    if (showLeaderboard) {
      updateUsers(partyId)(dispatch).then((returnedArray) => {
        //console.log("users");
        //console.log(returnedArray);
        if (returnedArray.length) {
          const filteredArray = returnedArray.filter((val) => val.score !== 0);
          filteredArray.sort((a, b) => b.score - a.score);
          //console.log(array)
          setHighscore(filteredArray[0].score);
          setArray(filteredArray);
          //setShowLeaderboard(!showLeaderboard);
        }
      });
    } else {
      if (isAdmin) {
        resetNumberOfAnswered(partyId);
        updateQuestionNumber(partyId);
      }
      resetScore(partyId, userId);
      setHighscore(null);
      setArray(null);
      //setShowLeaderboard(!showLeaderboard);
    }
  }, [showLeaderboard]);

  useEffect(() => {
    if (numOfAnswered === users.length) {
      nextClicked();
    }
  }, [numOfAnswered]);

  useEffect(() => {
    setupAnsweredListener(partyId)(dispatch);
    setupShowLeaderboardListener(partyId)(dispatch);
    setupQuestionNumberListener(partyId)(dispatch);
  }, []);

  useEffect(() => {
    startValue.setValue(0);
    Animated.spring(startValue, {
      toValue: endValue,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [numOfAnswered]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            detachJoinedListener(partyId);
            detachStartedListener(partyId);
            detachAnsweredListener(partyId);
            detachShowLeaderboardListener(partyId);
            dispatch(setPartyIdRedux(null));
            dispatch(setUserId(0));
            dispatch(setIsAdmin(null));
            dispatch(resetUsers());
            dispatch(setGameStarted(false));
            dispatch(setNumberOfPeopleAnswered(0));
            dispatch(setShowLeaderboard(false));
            navigation.navigate("Home");
          }}
          style={{ marginRight: 10, alignSelf: "center" }}
        >
          <FontAwesome name="sign-out" size={26} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <QuestionBox question= {questionText ? questionText : "Loading..."} />
      {!showLeaderboard ? (
        <UserSelectionList
          data={users}
          onPress={(clickedUserItem) => {
            userClicked(clickedUserItem);
          }}
        />
      ) : (
        <LeaderboardList array={array} highscore={highscore} />
      )}

      {isAdmin ? (
        <Pressable onPress={nextClicked} style={styles.pressable}>
          {!showLeaderboard ? (
            <Animated.View
              style={{
                transform: [{ scale: startValue }],
              }}
            >
              <Text style={styles.text}>
                {numOfAnswered}/{users.length}
              </Text>
            </Animated.View>
          ) : null}
          <MaterialIcons name="navigate-next" size={30} color="white" />
        </Pressable>
      ) : !showLeaderboard ? (
        <View style={styles.pressable}>
          <Animated.View
            style={{
              transform: [{ scale: startValue }],
            }}
          >
            <Text style={styles.text}>
              {numOfAnswered}/{users.length}
            </Text>
          </Animated.View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  pressable: {
    width: 100,
    height: 50,
    position: "absolute",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    bottom: 30,
    right: 30,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default GameScreen;
