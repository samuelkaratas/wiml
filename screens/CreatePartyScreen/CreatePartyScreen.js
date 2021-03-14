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

import { setPartyIdRedux, setIsAdmin, setCreatingParty } from "../../redux/game-actions";

import {
  createParty,
  setupJoinedListener,
  addQuestion,
} from "../../firebase/firebase";

const data = [
  "Who is most likely to be homeless?",
  "Who is most likely to play 10 hours of video games in a single day?",
  "Who is most likely to buy something they do not really need simply because it is cheap?",
  "Who is most likely to see a crime in progress and refused to help?",
  "Who is most likely to try to seduce a police officer officer on duty?",
  "Who is most likely to get a tutu that they will regret later?",
  "Who is most likely to take money from their parents without them knowing?",
  "Who is most likely to win the lottery?",
  "Who is most likely to give all their money to charity?",
  "Who is most likely to invent something useful?",
  "Who is most likely to destroy something out of anger?",
  "Who is most likely to lock the keys in the car?",
  "Who is most likely to talk openly about their bodily functions?",
  "Who is most likely to have an unusual fear?",
  "Who is most likely to become a famous actor/actress?",
  "Who is most likely to lose their wallet?",
  "Who is most likely to have a homosexual experience?",
  "Who is most likely to pee in the shower?",
  "Who is most likely to sleep on the street?",
  "Who is most likely to forget important birthdays?",
  "Who is most likely to be a world traveler?",
  'Who is most likely to have their last words be "watch this”?',
  "Who is most likely to sell all their worldly possessions?",
  "Who is most likely to full around with someone at a party even though their partners there?",
  "Who is most likely to run from the police officer?",
  "Who is most likely to be hungry 24/7?",
  "Who is most likely to trip in public?",
  "Who is most likely to sneak out of the restaurant without paying?",
  "Who is most likely to lose their phone?",
  "Who is most likely to get hit by a car?",
  "Who is most likely to sneak into a festival without paying?",
  "Who is most likely to start a forest fire?",
  "Who is most likely to be the first one to die in a zombie apocalypse?",
  "Who is most likely to be childhood friends with hitler?",
  "Who is most likely to ask an overweight woman if she is pregnant?",
  "Who is most likely to burn down their home for the insurance money?",
  "Who will have the most divorces by the time they are 80?",
  "Who would be the best stripper?",
  "In their lifetime, who is most likely to perform sexual acts for money?",
  "Who is most likely to have a secret sexual fetish?",
  "Who is most likely to have a naked picture of themselves on the internet?",
  "Who has slept with someone in the shortest amount of time after meeting them?",
  "Who is most likely to get too kinky on a first date hook-up?",
  "Who masturbates the most to former lovers?",
  "Who is most likely to secretly run a meth lab?",
  "Who will be the most difficult old person to be around?",
  "Who is most likely to join a cult?’,’If we were all in prison, who would rise to prison gang leader?",
];

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

  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const onCreateHandler = () => {
    dispatch(setCreatingParty(true));
    createParty(partyId, [
      { name: value, imageUrl: image, isAdmin: true, score: 0 },
    ])(dispatch);
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
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      //setImage(result.uri);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      cloudinaryUpload(base64Img);
    }

    setModalVisible(false);
  };

  const onCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    let base64Img = `data:image/jpg;base64,${result.base64}`;
    //console.log(image);

    cloudinaryUpload(base64Img);
    //setImage(image.uri);
    setModalVisible(false);
  };

  const cloudinaryUpload = (photo) => {
    setLoadingPhoto(true);
    let data = {
      file: photo,
      upload_preset: "wiml-preset-name",
    };

    fetch("https://api.cloudinary.com/v1_1/wiml/image/upload", {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        console.log(data.secure_url);
        setImage(data.secure_url);
        setLoadingPhoto(false);
        return data.secure_url;
      })
      .catch((err) => console.log(err));
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

      {loadingPhoto ? (
        <Text>Uploading photo to service...</Text>
      ) : (
        <CustomButton onPress={onCreateHandler}>CREATE</CustomButton>
      )}

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
