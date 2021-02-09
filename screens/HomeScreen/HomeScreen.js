import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../../components/customButton/customButton";

import { useNavigation } from '@react-navigation/native';

const HomeScreen = (props) => {
  const navigation = useNavigation()

  const onCreateHandler = () => {
    navigation.navigate('Create')
  };
  const onJoinHandler = () => {
    navigation.navigate('Join')
  };
  return (
    <View style={styles.container}>
      <CustomButton onPress={onCreateHandler}>Create</CustomButton>
      <CustomButton onPress={onJoinHandler}>Join</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default HomeScreen;
