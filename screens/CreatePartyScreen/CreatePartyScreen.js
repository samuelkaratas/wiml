import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  StyleSheet,
} from "react-native";

import ChooseImage from "../../components/chooseImage/chooseImage";

import CustomButton from "../../components/customButton/customButton";
import CustomInput from "../../components/customInput/customInput";
import CustomSwitch from "../../components/customSwitch/customSwitch";

import { useNavigation } from "@react-navigation/native";

import ImageChooserModal from "../../components/customModal/ImageChooserModal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { useDispatch, useSelector } from "react-redux";

import { setPartyIdRedux, setIsAdmin } from "../../redux/game-actions";

import { createParty, setupJoinedListener } from "../../firebase/firebase";

const CreatePartyScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [value, onChangeText] = useState("");
  const [image, setImage] = useState(null);
  const [partyId, setPartyId] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [isNSFWEnabled, setIsNSFWEnabled] = useState(false);
  const toggleNSFW = () => setIsNSFWEnabled((previousState) => !previousState);

  const [isGTKEnabled, setIsGTKEnabled] = useState(false);
  const toggleGTK = () => setIsGTKEnabled((previousState) => !previousState);

  const onCreateHandler = () => {
    createParty(partyId, [{ name: value, isAdmin: true, score: 0 }]);
    setupJoinedListener(partyId)(dispatch);
    dispatch(setPartyIdRedux(partyId));
    dispatch(setIsAdmin(true));
    navigation.navigate("Lobby");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const num = Math.floor(Math.random() * 100 + 10);
    setPartyId(num);
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const onImagePressed = () => {
    setModalVisible(true);
  };

  const onCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    setModalVisible(false);
  };

  const onCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);

    setImage(image.uri);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ChooseImage image={image} onPress={onImagePressed} />

      <CustomInput
        placeholder="NAME"
        value={value}
        onChangeText={(text) => onChangeText(text)}
      />

      <CustomSwitch isEnabled={isNSFWEnabled} toggleSwitch={toggleNSFW}>
        NSFW Expansion
      </CustomSwitch>

      <CustomSwitch isEnabled={isGTKEnabled} toggleSwitch={toggleGTK}>
        Get To Know Expansion
      </CustomSwitch>

      <Text style={styles.partyIdText}>Party Id: {partyId}</Text>

      <CustomButton onPress={onCreateHandler}>CREATE</CustomButton>

      <ImageChooserModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onCameraRoll={onCameraRoll}
        onCamera={onCamera}
      />
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

export default CreatePartyScreen;
