import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import PromptTextInput from "../../components/InputText";
import AlertButton from "../../components/AlertButton";

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Reset Password</Text>
      </View>
      <View style={styles.promptContainer}>
        <PromptTextInput placeholder="Email" />
      </View>
      <View style={styles.submitContainer}>
        <AlertButton
          buttonText="Send Link"
          text="Link has been successfully sent to your Email!"
        />
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
    height: 100,
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  headingText: {
    fontSize: 40,
    color: "purple",
    left: 50,
    top: 50,
  },
});

export default ResetPasswordScreen;
