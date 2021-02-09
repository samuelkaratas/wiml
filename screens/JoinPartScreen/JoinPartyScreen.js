import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import ChooseImage from "../../components/chooseImage/chooseImage";

import CustomButton from "../../components/customButton/customButton";
import CustomInput from "../../components/customInput/customInput";

import { useNavigation } from "@react-navigation/native";
import { joinParty, setupJoinedListener } from "../../firebase/firebase";

import { useDispatch, useSelector } from "react-redux";

import { setPartyIdRedux, setIsAdmin } from "../../redux/game-actions";

const JoinPartScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, onNameChange] = useState("");

  const [partyId, onPartyIdChange] = useState("");

  const onJoinHandler = () => {
    joinParty(partyId, { name: name, isAdmin: false, score: 0 })(dispatch);
    setupJoinedListener(partyId)(dispatch);
    dispatch(setPartyIdRedux(partyId));
    dispatch(setIsAdmin(false));
    navigation.navigate("Lobby");
  };

  return (
    <View style={styles.container}>
      <ChooseImage />

      <CustomInput
        placeholder="NAME"
        value={name}
        onChangeText={(text) => onNameChange(text)}
      />

      <CustomInput
        placeholder="PARTY ID"
        value={partyId}
        onChangeText={(text) => onPartyIdChange(text)}
      />

      <CustomButton onPress={onJoinHandler}>Join</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 200,
  },
  partyIdText: {
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 20,
  },
});

export default JoinPartScreen;
