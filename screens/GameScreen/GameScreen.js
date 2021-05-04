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
  setQuestionNumber,
  toggleEdit,
  resetEdit
} from "../../redux/game-actions";

import {
  selectUsers,
  selectPartyId,
  selectUserId,
  selectIsAdmin,
  selectNumberOfPeopleAnswered,
  selectShowLeaderboard,
  selectQuestionNumber,
  selectEdit,
} from "../../redux/game-selectors";

import {
  detachJoinedListener,
  detachStartedListener,
  detachAnsweredListener,
  detachQuestionNumberListener,
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
  getQuestionText,
  removeUserFromFirebase,
} from "../../firebase/firebase";

let seenQuestions = [];

const GameScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const users = useSelector(selectUsers);
  const isAdmin = useSelector(selectIsAdmin);
  const partyId = useSelector(selectPartyId);
  const userId = useSelector(selectUserId);
  const showLeaderboard = useSelector(selectShowLeaderboard);
  const questionNumber = useSelector(selectQuestionNumber);
  const edit = useSelector(selectEdit);

  const numOfAnswered = useSelector(selectNumberOfPeopleAnswered);

  const [highscore, setHighscore] = useState(null);
  const [array, setArray] = useState(null);
  const [questionText, setQuestionText] = useState(null);
  const [selected, setSelected] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [finished, setFinished] = useState(false);

  const nextClicked = async () => {
    if (isAdmin) {
      changeShowLeaderboard(partyId);
    }
  };

  const startValue = new Animated.Value(1);
  const endValue = 1.2;

  const userClicked = (item) => {
    updateNumberOfPeopleAnswered(partyId, item.key);
    setSelected(true);
  };

  useEffect(() => {
    let unmounted = false;

    const runFunction = async () => {
      //console.log("questionNumber" + questionNumber);
      const returnedObject = await getQuestionText(questionNumber);
      setQuestionText(returnedObject.questionText);
    };
    if (!unmounted) {
      runFunction();
    }

    return () => {
      unmounted = true;
    };
  }, [questionNumber]);

  useEffect(() => {
    //console.log("showLeaderboard" + showLeaderboard);
    let unmounted = false;

    if (!unmounted) {
      if (showLeaderboard) {
        updateUsers(partyId)(dispatch).then((returnedArray) => {
          if (returnedArray.length) {
            const filteredArray = returnedArray.filter(
              (val) => val.score !== 0
            );
            if (filteredArray.length) {
              filteredArray.sort((a, b) => b.score - a.score);
              setHighscore(filteredArray[0].score);
              setArray(filteredArray);
            } else {
              setSkipped(true);
            }
          }
        });
      } else {
        if (isAdmin) {
          resetNumberOfAnswered(partyId);
          let num = 0;
          if (seenQuestions.length >= 301) {
            alert(
              "Woooowww!! You people must be hammered because I am all out of questions."
            );
            leaveParty();
          }
          do {
            num = chooseQuestionNumber();
          } while (num === null);

          //console.log(num);
          updateQuestionNumber(num, partyId);
          //console.log(seenQuestions);
        }
        resetScore(partyId, userId);
        setHighscore(null);
        setArray(null);
        setSelected(false);
        setSkipped(false);
      }
    }

    return () => {
      unmounted = true;
    };
  }, [showLeaderboard]);

  const chooseQuestionNumber = () => {
    const randomNumber = Math.floor(Math.random() * 302);
    if (seenQuestions.includes(randomNumber)) {
      //console.log(randomNumber + " has been seen before!");
      return null;
    } else {
      seenQuestions.push(randomNumber);
      return randomNumber;
    }
  };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (numOfAnswered >= users.length) {
        nextClicked();
      }
    }

    return () => {
      unmounted = true;
    };
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

  const leaveParty = () => {
    detachJoinedListener(partyId);
    detachStartedListener(partyId);
    detachAnsweredListener(partyId);
    detachShowLeaderboardListener(partyId);
    detachQuestionNumberListener(partyId);
    removeUserFromFirebase(partyId, userId);
    dispatch(setPartyIdRedux(null));
    dispatch(setUserId(0));
    dispatch(setIsAdmin(null));
    dispatch(resetUsers());
    dispatch(setGameStarted(false));
    dispatch(setNumberOfPeopleAnswered(0));
    dispatch(setShowLeaderboard(false));
    dispatch(setQuestionNumber(0));
    dispatch(resetEdit());
    seenQuestions = [];
    navigation.navigate("Home");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={leaveParty}
          style={{ marginRight: 10, alignSelf: "center" }}
        >
          <FontAwesome name="sign-out" size={26} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const editPlayersClicked = () => {
    dispatch(toggleEdit());
  };

  return (
    <View style={styles.container}>
      <QuestionBox question={questionText ? questionText : "Loading..."} />
      {!showLeaderboard ? (
        !selected ? (
          <UserSelectionList
            data={users}
            onPress={(clickedUserItem) => {
              userClicked(clickedUserItem);
            }}
          />
        ) : (
          <Text style={styles.text}>Waiting for others...</Text>
        )
      ) : skipped ? (
        <Text style={styles.text}>Host skipped the question</Text>
      ) : (
        <LeaderboardList array={array} highscore={highscore} />
      )}

      {isAdmin ? (
        <Pressable
          onPress={() => (!edit ? nextClicked() : null)}
          style={styles.pressable}
        >
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
          {!edit ? (
            <MaterialIcons name="navigate-next" size={30} color="white" />
          ) : null}
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

      {isAdmin && !showLeaderboard && !selected ? (
        <Pressable onPress={editPlayersClicked} style={styles.editPressable}>
          {!edit ? (
            <Text style={styles.text}>Edit Players</Text>
          ) : (
            <Text style={styles.text}>Stop Editing</Text>
          )}
        </Pressable>
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
    bottom: 25,
    right: 25,
  },
  editPressable: {
    width: 100,
    height: 50,
    position: "absolute",
    backgroundColor: "tomato",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    bottom: 25,
    left: 25,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default GameScreen;
