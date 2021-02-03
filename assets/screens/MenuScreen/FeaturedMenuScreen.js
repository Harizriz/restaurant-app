import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

class FeaturedMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Featured Menu Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

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
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
});

export default FeaturedMenuScreen;