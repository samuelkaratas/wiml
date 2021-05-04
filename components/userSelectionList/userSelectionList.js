import React from "react";

import { FlatList, StyleSheet } from "react-native";

import UserButton from "../userButton/userButton";

const UserSelectionList = ({ data, onPress }) => {
  return (
    <FlatList
      key={"#"}
      data={data}
      renderItem={({ item }) => (
        <UserButton
          onPress={() => {
            console.log(item.key)
            onPress(item);
          }}
          username={item.name}
          imageUrl={item.imageUrl}
          userId={item.key}
          admin={item.isAdmin}
        />
      )}
      keyExtractor={(item) => item.key}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      style={styles.flatlist}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    height: 470,
    flexGrow: 0,
    marginBottom: 75,
  },
});

export default UserSelectionList;
