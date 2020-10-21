import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Button from "react-native-button";

import PromptTextInput from "../components/InputText";


const ChangePasswordScreen = ({ navigation }) => {
  const createAlert = () => Alert.alert("Password changed successfully!");
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Change Password</Text>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.text}>Current password</Text>
        <PromptTextInput placeholder="" />
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.text}>New password</Text>
        <PromptTextInput placeholder="" />
      </View>
      <View style={styles.submitContainer}>
      <Button
        style={{
            fontSize: 15,
            padding: 16,
            width: 100,
            borderRadius: 5,
            alignItems: "center",
            backgroundColor: "grey",
            color: "white",
            overflow: "hidden",
            top: 20,
            left: 30
        }}
        onPress={() => navigation.goBack()}>
        Cancel
      </Button>
      <Button
        style={{
            fontSize: 15,
            padding: 16,
            width: 100,
            borderRadius: 5,
            alignItems: "center",
            backgroundColor: "grey",
            color: "white",
            overflow: "hidden",
            top: 20,
            left: 50
        }}
        onPress={createAlert}>
        Change
      </Button>
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
  promptContainer: {
    height: 125,
    top: 5
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    // alignContent: "center",
    // backgroundColor: "green",
    marginHorizontal: 50,
  },
  headingText: {
    fontSize: 30,
    color: "purple",
    left: 50,
    top: 50,
  },
  text: {
      fontSize: 15,
      left: 50,
      top: 20
  }
});

export default ChangePasswordScreen;
