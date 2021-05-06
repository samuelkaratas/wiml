import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  ActionSheetIOS,
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

import {
  setPartyIdRedux,
  setIsAdmin,
  setCreatingParty,
} from "../../redux/game-actions";

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
  "Who is most likely to get a tattoo they will later regret?",
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
  "Who is most likely to fool around with someone at a party even though their partners there?",
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
  "Who is most likely to impregnate someone (or get pregnant) this year?",
  "Who would charge the most as a hitman?",
  "If we were all prostitutes, who would charge the most?",
  "Who is least likely to give up their seat on the bus for an elderly person?",
  "Who would i call if i needed help burying a dead body?",
  "If a private investigator did a background check on all of us, whose would be the most unsettling?",
  "Who is most likely to tip less than 10% at a restaurant?",
  "If I decided to rob a bank, who is the last person I would choose to help me?",
  "Who has the best chance of cheating a lie detector test?",
  "Who will be the next person to get punched in the face?",
  "Who is most likely to support polygamy?",
  "In the event of a zombie apocalypse, who would sacrifice everyone here to save themselves?",
  "Who would I trust the least with a newborn baby?",
  "If we were all on survivor, who would be the first person voted off the island?",
  "Who is most likely to become a liability after two drinks?",
  "Who is most likely to steal from their employer?",
  "If we were all stand-up comedians, who would get the least amount of laughs?",
  "Who is most likely to commit a hit-and-run?",
  "Who is most likely to create a scam business?",
  "In their lifetime, who will have the least positive impact on the human species?",
  "Whose face looks most like a face of an animal?",
  "Who is most likely to sell out their family and friends for fame?",
  "Who would be the worst reality tv show star?",
  "Who is most likely to follow-through on a revenge plot?",
  "Who would be the worst phone sex operator?",
  "Who is most likely to appear on the NO FLY LIST?",
  "Who is least likely to tell a new sexual partner that they have STD?",
  "Who is most likely to purchase a mail-order wife/husband?",
  "Who is most likely to murder their spouse for the insurance money and get away with it?",
  "Who is most likely to marry for money?",
  "Who should be banned from creating offspring?",
  "Who is most likely to cock block a friend?",
  "Who is most likely to RSPV yes to a party but never show up?",
  "Who has probably successfully blackmailed someone?",
  "Who thinks they are more attractive than they actually are?",
  "Who is most likely to give a drunk, train wreck speech at a wedding?",
  "Who is most likely to turn up drunk to pre-drinks?",
  "Who is most likely to accidentally shoot themselves?",
  "Who has secretly done something very naughty?",
  "Who takes the most sick days off without actually being sick?",
  "If I decided to kidnap someone, who is the last person I would ask to help me?",
  "Who is most likely to have a mid-life crisis?",
  "Who is most likely to talk their way out of a speeding ticket?",
  "Who is most likely to pay for sex?",
  "If I were on who wants to be a millionaire, who is the last person i would call as a lifeline?",
  "Who is least likely to be a target for identity theft?",
  "In their lifetime, who is most likely to be committed to an insane asylum?",
  "Who is the most high maintenance in a relationship?",
  "Who is most likely to end up broke due to a gambling addiction?",
  "Who is least likely to shave their genital area?",
  "Who would be the most successful serial killer?",
  "Who is least likely to sacrifice their life for a family member?",
  "If we were all homeless panhandlers, who would make the least amount of money?",
  "Who is most likely to show up to an emergency room with an axe in their head?",
  "If a big fire broke out right now, who would push everyone out of the way to get out first?",
  "Who will be the next person to have a threesome?",
  "In their lifetime, who will most likely need a liver transplant?",
  "Who is most likely to go out with Donald Trump?",
  "Who is most likely to become a vegetarian because their partner wanted them to?",
  "Who is most likely to join isis?",
  "If everyone committed a homicide, who would be the last person to get caught?",
  "Who is most likely to fall for a pyramid scheme?",
  "Who is most likely to enjoy being dominated in the bedroom? ",
  "Who was the last person to piss on a sexual partner? ",
  "If we were all therapists, who would probably sleep with their patients?",
  "Who is most likely to become a liability after eating a pot brownie?",
  "Who is least likely to believe in global warming?",
  "Who would be the worst person to work for?",
  "Who was the last person to masturbate?",
  "Who has done the most walks of shame?",
  "Who is least likely to send a sext?",
  "Who has seen the most people in this room naked?",
  "In their lifetime, who is most likely to become a pimp or madam?",
  "Who is most like their racial stereotype?",
  "Who is most likely to have had sex in the back of a taxi?",
  "Who would get the most enjoyment from being a member of the opposite sex for a day?",
  "Who is most likely to lie to someone to get something they want?",
  "Who would sell their soul for the least amount of money?",
  "They say; you cannot judge a book by its cover. Who did I misread when we first met?",
  "Who is most likely to crack a beer during a eulogy?",
  "Who is most likely to fake an orgasm?",
  "If I was the ruthless dictator of a country, who would I choose as my second-in-command?",
  "Who is most likely to cheat while playing a board game?",
  "Who is most likely to convince the group to play strip poker?",
  "Who is most likely to shout the wrong name during sex?",
  "Who has had sex in the most random place?",
  "Who is the worst person to call for relationship advice?",
  "Who is most likely to have sex with a homeless guy because they thought he was a hipster?",
  "Who is most likely to not get the joke?",
  "Who has the largest porn collection?",
  "Who is most likely to laugh if they saw a blind person trip?",
  "Who is most likely to say; I am not racist, but ... ?",
  "Who is most likely to fart and blame it on someone else?",
  "Who would tattoo a teardrop on their face for the least amount of money?",
  "Who has gone the longest without showering?",
  "Who is most likely to end up on the most wanted list of FBI?",
  "Who is most likely to steal from a tip jar?",
  "Who is most likely to create a fake social media account to spy on someone?",
  "Who really needs to start making new years resolutions?",
  "Who is most likely to leave a party by blowing glitter in your face and disappearing?",
  "Who is most likely to accidentally have drugs on them while going through airport security?",
  "Who would be the easiest to kidnap?",
  "Who was the oldest person to lose their virginity?",
  "Who would take the longest to be reported to the police as missing?",
  "Who has the worst -game-?",
  "Who is most likely to shed the next drunken tear?",
  "Who is most likely to borrow something with no intention of returning it?",
  "Who is most likely to lie on their resume?",
  "Who is -never the problem- in a relationship?",
  "Who is most likely to draw a dick on a passed out friend?",
  "Who was the last person to have a drink thrown in their face?",
  "Who has the worst poker face?",
  "Who was the last person to be drunk/high at work?",
  "Who is most likely to say I love you too early?",
  "Who is most likely to wake up tomorrow not knowing where they are?",
  "Who cannot go 10 minutes without looking at themselves in the mirror?",
  "Who is most likely to puke and rally?",
  "If we were all police officers, who would be the dirty cop?",
  "Who is most likely to run into a former lover and not remember their name?",
  "Who is most likely to rat me out if they were under pressure from the cops?",
  "Who is most likely to have a secret body piercing or tattoo?",
  "If we were all characters in a horror movie, who would get killed first?",
  "Who is most likely to have a secret sex tape?",
  "Who is most likely to sleep with a co-worker?",
  "Who is most likely to be high right now?",
  "Who would be the best teacher?",
  "Who would be the coolest old person?",
  "Who is most likely to rescue an animal?",
  "Who would be the best trip-sitter?",
  "Who is most likely to overdose?",
  "Who is most likely to have a split personality?",
  "Who is most likely to not be able to go a day without the Internet?",
  "Who is most likely to put laxative in someones food or drink?",
  "Who is most likely to get abducted by aliens?",
  "Who is most likely to eat cat or dog food?",
  "Who is most likely to have peed on someone?",
  "Who is most likely to lie about their age?",
  "Who is most likely to poop their pants in public?",
  "Who is most likely to try cannibalism?",
  "Who is most likely to not order food and then eat of plates of others?",
  "Who is most likely to swim with the sharks?",
  "Who is most likely to get arrested?",
  "Who is most likely to watch someone give birth?",
  "Who is most likely to send an embarrassing text message to the wrong person?",
  "Who is most likely to laugh at the wrong moment?",
  "Who is most likely to cross dress?",
  "Who is most likely to become the president?",
  "Who is most likely to go to the museum high?",
  "Who is most likely to enjoy getting roofied?",
  "Who is most likely to be great at sex?",
  "Who is most likely to do their hair before going to the gym?",
  "Who is most likely to become a drug dealer?",
  "Who is most likely to have a gun collection?",
  "Who is most likely to run away to join the circus?",
  "Who is most likely to do not take a shower for a week?",
  "Who is most likely to be the prettiest person in this room?",
  "Who is most likely to live for the next 80 years?",
  "Who is most likely to be dead in 10 years?",
  "Who is most likely to sleep with someone for $1 million?",
  "Who is most likely to die surrounded by cats?",
  "Who is most likely to fat shame someone?",
  "Who is most likely to develop a porn addiction?",
  "Who is most likely to be rich in 10 years?",
  "Who is most likely to die from something stupid?",
  "Who is most likely to tell a racist joke?",
  "Who is most likely to accidentally kill someone?",
  "Who is most likely to go to hell?",
  "Who is most likely to get arrested for walking around naked?",
  "Who is most likely to use a lot of lube? ",
  "Who is most likely to masturbate more than three times a day?",
  "Who is most likely to masturbate in the shower?",
  "Who is most likely to have the biggest penis?",
  "Who is most likely to masturbated at work?",
  "Who is most likely to break the bed during sex?",
  "Who is most likely to have sex on the kitchen counter and prepare food immediately after it?",
  "Who is most likely to date two people at the same?",
  "Who is most likely to forget the person they had sex with?",
  "Who is most likely to have sex with someone who is married?",
  "Who is most likely to have a sex with a blowup doll?",
  "Who is most likely to have sex with more than one person within 24 hours?",
  "Who is most likely to photocopy genitals?",
  "Who is most likely to have sex more than one person at the same time?",
  "Who is most likely to pay for a hotel room for one night only to have sex?",
  "Who is most likely to say someone I love you just to get laid?",
  "Who is most likely to like stuff with feet?",
  "Who is most likely to requests ranking while having sex?",
  "Who is most likely to wake up next to a total stranger?",
  "Who is most likely to have a friend who becomes a fuck buddy?",
  "Who is most likely to go to a swingers club?",
  "Who is most likely to be a submissive during sex?",
  "Who is most likely to loose their underwear at someones place?",
  "Who is most likely to get fisted?",
  "Who is most likely to preferred doggy style sex?",
  "Who is most likely to have a sex with a celebrity?",
  "Who is most likely to require medical attention because there is a foreign object stuck inside of them?",
  "Who is most likely to make a girl orgasm?",
  "Who is most likely to have sex with two different people without showering in between?",
  "Who is most likely to call someone the wrong name while having sex?",
  "Who is most likely to get someone drunk to have sex with them?",
  "Who is most likely to participate in an orgy?",
  "Who is most likely to be dominant during sex?",
  "Who is most likely to not hide their porn on their computer?",
  "Who is most likely to forget the name of person they have slept with?",
  "Who is most likely to lie to protect a cheating friend?",
  "Who is most likely to end up naked without remembering why?",
  "Who is most likely to received a noise complaint after sex?",
  "Who is most likely to have sex with someone five or more years younger?",
  "Who is most likely to have sex with someone twice their age?",
  "Who is most likely to watch gay porn?",
  "Who is most likely to go to a nude beach?",
  "Who is most likely to sleep with someone within an hour of meeting them?",
  "Who is most likely to injured themselves during sex?",
  "Who is most likely to watch porn with a friend?",
  "Who is most likely to sniff someones underwear?",
  "Who is most likely	to snort alcohol in order to try to get high?",
  "Who is most likely	to find feet sexy?",
  "Who is most likely	to receive bribes if they were government officials?",
  "Who is most likely	to have sex tonight?",
  "Who is most likely	to be into anal sex?",
  "Who is most likely	to have used butt-plug before?",
  "Who is most likely	to have a horrible moaning?",
  "Who is most likely	to snore?",
  "Who is most likely	to be the president of the country?",
  "Who is most likely	to get caught picking their nose?",
  "Who is most likely	to fight with the police?",
  "Who is most likely	to discover that they have a different sexual orientation?",
  "Who hates their job the most?",
  "Who is most likely	to break one of their limbs on purpose to get painkiller medications?",
  "Who is most likely	to die because of drugs?",
  "Who is most likely	to die first?",
  "Who had sex with the most amount of people?",
  "Who swims naked the most?",
  "Who is most likely	to poop their underwear while trying to fart?",
  "Who is most likely	to run into a glass wall because they were focused on their phone?",
  "Who is most likely	to want their ass fingered while having sex?",
  "Who is most likely	to sleep with their boss?",
  "Who is most likely	to sleep with their teacher?",
  "Who is most likely	to watch the entire -How I Met Your Mother?- in a week?",
  "Who is most likely	to eat someone's sandwich from the company fridge?",
  "Who is most likely	to photocopy their ass and try to make it the company logo?",
  "Who is most likely	to paint people's ass and make a painting on the wall?",
  "Who is most likely	to grow marijuana in their home?",
  "Who is most likely	to lie on first date?",
  "Who is most likely	to have fake social media account? ",
  "Who is most likely	to cheat?",
  "Who is most likely	to kill someone?",
  "Who is most likely	to tell friends' secrets?",
  "Who is most likely	to be the president of the country?",
  "Who is most likely	to adopt a disabled animal?",
  "Who is most likely	to give their last money to a friend in need?",
  "Who is most likely	to have a positive impact on humanity?",
  "Who is most likely	to marry someone to give them citizenship?",
  "Who is most likely	to adopt a child?",
  "Who is the best at sex?",
  "Who is most likely	to be called when in need?",
  "Who is most likely	to protest against cutting of trees?",
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
    if (value.length) {
      dispatch(setCreatingParty(true));
      createParty(partyId, [
        { name: value, imageUrl: image, isAdmin: true, score: 0 },
      ])(dispatch);
      setupJoinedListener(partyId)(dispatch);
      dispatch(setPartyIdRedux(partyId));
      dispatch(setIsAdmin(true));
      navigation.navigate("Lobby");
    } else {
      alert("Please fill out all the fields.");
    }
  };

  useEffect(() => {
    const num = Math.floor(Math.random() * 100000 + 10);
    setPartyId(num);
  }, []);

  const verifyPermissions2 = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to add a profile photo!");
        return false;
      }
      return true;
    }
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      alert("Sorry, we need camera permissions to add a profile photo!", [
        { text: "Okay" },
      ]);
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
              value={value}
              onChangeText={(text) => onChangeText(text)}
            />

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
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

/*
<CustomSwitch isEnabled={isNSFWEnabled} toggleSwitch={toggleNSFW}>
  NSFW Expansion (SOON)
</CustomSwitch>

<CustomSwitch isEnabled={isGTKEnabled} toggleSwitch={toggleGTK}>
  Ice breaker Expansion (SOON)
</CustomSwitch>
*/

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

export default CreatePartyScreen;
