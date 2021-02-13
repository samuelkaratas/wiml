import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ChooseImage from "../../components/chooseImage/chooseImage";

import CustomButton from "../../components/customButton/customButton";
import CustomInput from "../../components/customInput/customInput";

import ImageChooserModal from "../../components/customModal/ImageChooserModal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import { joinParty, setupJoinedListener } from "../../firebase/firebase";

import { useDispatch, useSelector } from "react-redux";

import { setPartyIdRedux, setIsAdmin } from "../../redux/game-actions";

const JoinPartScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [name, onNameChange] = useState("");
  const [partyId, onPartyIdChange] = useState("");

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onJoinHandler = () => {
    joinParty(partyId, { name: name, imageUrl: image, isAdmin: false, score: 0 })(dispatch);
    setupJoinedListener(partyId)(dispatch);
    dispatch(setPartyIdRedux(partyId));
    dispatch(setIsAdmin(false));
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
        return data.secure_url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
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

      <CustomButton onPress={onJoinHandler}>Join</CustomButton>

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

export default JoinPartScreen;
