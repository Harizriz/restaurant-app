import React from "react";
import { StyleSheet, View, Text } from "react-native";

const FeaturedMenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Featured Menu Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  headingContainer: {
    height: 100,
    // backgroundColor: "yellow",
  },
  headingText: {
    fontSize: 40,
    color: "purple",
    left: 50,
    top: 50,
  },
});

export default FeaturedMenuScreen;
