import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  ActionSheetIOS,
} from "react-native";

import ChooseImage from "../../components/chooseImage/chooseImage";

import CustomButton from "../../components/customButton/customButton";
import CustomInput from "../../components/customInput/customInput";

import ImageChooserModal from "../../components/customModal/ImageChooserModal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import {
  joinParty,
  setupJoinedListener,
  checkIfRoomExsist,
} from "../../firebase/firebase";

import { useDispatch, useSelector } from "react-redux";

import {
  setPartyIdRedux,
  setIsAdmin,
  setCreatingParty,
} from "../../redux/game-actions";

const JoinPartScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, onNameChange] = useState("");
  const [partyId, onPartyIdChange] = useState("");

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);

  const onJoinHandler = async () => {
    setLoading(true);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      const exsist = await checkIfRoomExsist(partyId);
      if (name.length && partyId.length) {
        if (exsist) {
          dispatch(setCreatingParty(true));
          joinParty(partyId, {
            name: name,
            imageUrl: image,
            isAdmin: false,
            score: 0,
          })(dispatch);
          setupJoinedListener(partyId)(dispatch);
          dispatch(setPartyIdRedux(partyId));
          dispatch(setIsAdmin(false));
          setLoading(false);
          navigation.navigate("Lobby");
        } else {
          alert("Party doesn't exsist");
          setLoading(false);
        }
      } else {
        alert("Please fill out all the fields.");
        setLoading(false);
      }
    };
    if (loading) {
      asyncFunction();
    }
  }, [loading]);

  const verifyPermissions2 = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return false;
      }
      return true;
    }
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return false;
    }
    return true;
  };

  const onImagePressed = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Choose photo from camera roll", "Take photo"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
          console.log("cancel");
        } else if (buttonIndex === 1) {
          onCameraRoll();
        } else if (buttonIndex === 2) {
          onCamera();
        }
      }
    );
  };

  const onCameraRoll = async () => {
    const hasPermission = await verifyPermissions2();
    if (!hasPermission) {
      return;
    }
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

    //setModalVisible(false);
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
    //setModalVisible(false);
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
        //console.log(data.secure_url);
        setImage(data.secure_url);
        setLoadingPhoto(false);
        return data.secure_url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <ChooseImage image={image} onPress={onImagePressed} />

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

            {loadingPhoto ? (
              <Text>Uploading photo to service...</Text>
            ) : loading ? (
              <Text>Joining...</Text>
            ) : (
              <CustomButton onPress={onJoinHandler}>Join</CustomButton>
            )}

            <ImageChooserModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              onCameraRoll={onCameraRoll}
              onCamera={onCamera}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  partyIdText: {
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 20,
  },
});

export default JoinPartScreen;
