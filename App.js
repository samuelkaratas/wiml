import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { gameReducer } from "./redux/game-reducer";

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer);

import MainNavigatior from "./navigation/navigation";

import CreatePartyScreen from "./screens/CreatePartyScreen/CreatePartyScreen";
import GameScreen from "./screens/GameScreen/GameScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import JoinPartScreen from "./screens/JoinPartScreen/JoinPartyScreen";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigatior />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
