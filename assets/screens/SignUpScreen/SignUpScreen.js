import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "react-native-button";

import PromptTextInput from "../../components/InputText";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Create new account</Text>
      </View>
      {/* <View style={styles.pictureContainer}></View> */}
      <View style={styles.promptContainer}>
        <PromptTextInput placeholder="First Name" />
        <PromptTextInput placeholder="Last Name" />
        <PromptTextInput placeholder="Email" />
        <PromptTextInput placeholder="Password" />
      </View>
      <View style={styles.submitContainer}>
        <Button
          style={{
            padding: 16,
            width: 250,
            borderRadius: 24,
            alignItems: "center",
            backgroundColor: "purple",
            color: "white",
            overflow: "hidden",
            top: 20,
          }}
          onPress={() => navigation.navigate("")}
        >
          Sign Up
        </Button>
      </View>
      <View style={styles.or}>
        <Text>OR</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          style={{
            padding: 16,
            width: 250,
            borderRadius: 24,
            alignItems: "center",
            backgroundColor: "#3b5998",
            color: "white",
            overflow: "hidden",
          }}
          onPress={() => navigation.navigate("")}
        >
          Login with Facebook
        </Button>
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("SignUpPhoneNumberScreen")}
        >
          Sign up with phone number
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
    height: 300,
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
    paddingTop: 30,
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

export default SignUpScreen;
