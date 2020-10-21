import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import PromptTextInput from "../../components/InputText";
import AlertButton from "../../components/AlertButton";

const SignUpPhoneNumberScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Create new account</Text>
      </View>
      {/* <View style={styles.pictureContainer}></View> */}
      <View style={styles.promptContainer}>
        <PromptTextInput placeholder="First Name" />
        <PromptTextInput placeholder="Last Name" />
        <PromptTextInput placeholder="Phone Number" />
      </View>
      <View style={styles.submitContainer}>
        <AlertButton
          buttonText="Send Code"
          text="A code has been sent to your message!"
        />
      </View>
      <View style={styles.or}>
        <Text>OR</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Sign up with Email
        </Text>
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
  pictureContainer: {
    height: 125,
    // backgroundColor: "orange",
  },
  promptContainer: {
    height: 250,
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    // backgroundColor: "green",
    alignSelf: "center",
  },
  headingText: {
    fontSize: 30,
    color: "purple",
    left: 50,
    top: 50,
  },
  link: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    top: 75,
    right: 50,
    color: "blue",
  },
  loginLink: {
    alignSelf: "center",
    color: "blue",
    paddingTop: 10,
  },
  or: {
    height: 40,
    alignSelf: "center",
    // backgroundColor: "orange",
  },
  bottomContainer: {
    height: 200,
    alignSelf: "center",
    // backgroundColor: "pink",
  },
});

export default SignUpPhoneNumberScreen;
