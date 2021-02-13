import React, {useEffect} from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import {
  setPartyIdRedux,
  setIsAdmin,
  resetUsers,
  setGameStarted,
  setUserId,
} from "../../redux/game-actions";

import {
  selectUsers,
  selectPartyId,
  selectIsAdmin,
  selectStarted,
  selectUserId,
} from "../../redux/game-selectors";

import {
  detachJoinedListener,
  updateStarted,
  detachStartedListener,
  setupSignoutListener,
  removeUserFromFirebase,
} from "../../firebase/firebase";

const LobbyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const partyId = useSelector(selectPartyId);
  const isAdmin = useSelector(selectIsAdmin);
  const started = useSelector(selectStarted);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    console.log(users);
    setupSignoutListener(partyId)(dispatch, navigation);
  }, []);

  useEffect(() => {
    console.log(started);
    if (started) {
      navigation.navigate("Game");
    }
  }, [started]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            detachJoinedListener(partyId);
            detachStartedListener(partyId);
            removeUserFromFirebase(partyId, userId);
            dispatch(setPartyIdRedux(null));
            dispatch(setUserId(0));
            dispatch(setIsAdmin(null));
            dispatch(resetUsers());
            dispatch(setGameStarted(false));
            navigation.navigate("Home");
          }}
          style={{ marginRight: 10, alignSelf: "center" }}
        >
          <FontAwesome name="sign-out" size={26} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const startPartyClickHandler = () => {
    updateStarted(partyId, true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.questionText}>
          Your friends can join using the party id: {partyId}
        </Text>
      </View>
      <FlatList
        key={"_"}
        data={users}
        renderItem={({ item }) => (
          <View style={styles.flatlistContainer}>
            <View style={styles.imageAndNameContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/user-profile2.webp")}
                />
              </View>
              <Text style={styles.username}>{item.name}</Text>
            </View>
            {isAdmin ? (
              <Pressable onPress={() => console.log(`Remove = ${item.name}`)}>
                <MaterialIcons
                  name="highlight-remove"
                  size={24}
                  color="white"
                />
              </Pressable>
            ) : null}
          </View>
        )}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
      />
      {isAdmin ? (
        <Pressable onPress={startPartyClickHandler} style={styles.pressable}>
          <Text style={styles.text}>Start The Party</Text>
          <MaterialIcons name="navigate-next" size={30} color="white" />
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
    width: "80%",
    height: 50,
    position: "absolute",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    bottom: 30,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  username: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  flatlist: {
    maxHeight: 600,
    flexGrow: 0,
    width: "60%",
  },
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  flatlistContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imageAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionText: {
    color: "white",
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 50,
    marginTop: 100,
    marginBottom: 10,
  },
});

export default LobbyScreen;
