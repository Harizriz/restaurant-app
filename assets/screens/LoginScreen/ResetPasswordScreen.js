import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import PromptTextInput from "../../components/InputText";
import AlertButton from "../../components/AlertButton";

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
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