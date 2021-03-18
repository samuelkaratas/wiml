import React from "react";

import { ImageBackground, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CreatePartyScreen from "../screens/CreatePartyScreen/CreatePartyScreen";
import JoinPartScreen from "../screens/JoinPartScreen/JoinPartyScreen";
import GameScreen from "../screens/GameScreen/GameScreen";
import LobbyScreen from "../screens/LobbyScreen/LobbyScreen";

const Stack = createStackNavigator();

const MainNavigatior = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        >
          {(props) => (
            <ImageBackground
              source={require("../assets/background.png")}
              style={styles.image}
            >
              <HomeScreen {...props} />
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Create"
          options={{
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        >
          {(props) => (
            <ImageBackground
              source={require("../assets/background.png")}
              style={styles.image}
            >
              <CreatePartyScreen {...props} />
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Join"
          options={{
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        >
          {(props) => (
            <ImageBackground
              source={require("../assets/background.png")}
              style={styles.image}
            >
              <JoinPartScreen {...props} />
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Game"
          options={({ route }) => ({
            title: route.params.partyName,
            headerTransparent: true,
            headerTintColor: "#fff",
            headerLeft: () => null,
          })}
        >
          {(props) => (
            <ImageBackground
              source={require("../assets/background.png")}
              style={styles.image}
            >
              <GameScreen {...props} />
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Lobby"
          options={{
            headerTransparent: true,
            headerTintColor: "#fff",
            headerLeft: () => null,
          }}
        >
          {(props) => (
            <ImageBackground
              source={require("../assets/background.png")}
              style={styles.image}
            >
              <LobbyScreen {...props} />
            </ImageBackground>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainNavigatior;
