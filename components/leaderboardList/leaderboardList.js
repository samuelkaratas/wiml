import React from "react";

import { FlatList, StyleSheet } from "react-native";
import LeaderboardItem from "../leaderboardItem/leaderboardItem";

const LeaderboardList = ({ array, highscore }) => {
  return (
    <FlatList
      key={"_"}
      data={array}
      renderItem={({ item }) => (
        <LeaderboardItem
          username={item.name}
          imageUrl={item.imageUrl}
          score={item.score}
          isDrinking={item.score === highscore ? true : false}
        />
      )}
      showsVerticalScrollIndicator={false}
      style={styles.flatlist}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    height: 470,
    flexGrow: 0,
  },
});

export default LeaderboardList;
