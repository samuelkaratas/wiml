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
            onPress(item);
          }}
          username={item.name}
          imageUrl={item.imageUrl}
        />
      )}
      keyExtractor={(item) => item.name}
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
