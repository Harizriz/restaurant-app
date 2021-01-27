import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, TextInput } from "react-native";
import Button from "react-native-button";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Sign In</Text>
        </View>
        <View style={styles.promptContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 2,
              borderRadius: 10,
              width: "75%",
              left: 50,
              paddingLeft: 20,
              marginTop: 20,
              top: 20,
            }}
            onChangeText={PasswordValueHolder => this.setState({PasswordValueHolder})}
          />      
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 2,
              borderRadius: 10,
              width: "75%",
              left: 50,
              paddingLeft: 20,
              marginTop: 20,
              top: 20,
            }}
            onChangeText={PasswordValueHolder => this.setState({PasswordValueHolder})}
          />      
          <Text
            style={styles.link}
            onPress={() => this.props.navigation.navigate("ResetPasswordScreen")}
          >
            Forgot Password?
          </Text>
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
              top: 30,
            }}
            onPress={() => this.props.navigation.navigate("FeaturedMenuScreen")}
          >
            Sign In
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
            onPress={() => this.props.navigation.navigate("")}
          >
            Login with Facebook
          </Button>
          {/* <Text
            style={styles.loginLink}
            onPress={() => this.props.navigation.navigate("LoginPhoneNumberScreen")}
          >
            Login with phone number
          </Text> */}
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
    height: 200,
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  headingText: {
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
  link: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    top: 25,
    right: 50,
    color: "blue",
  },
  loginLink: {
    alignSelf: "center",
    color: "blue",
    paddingTop: 30,
  },
  or: {
    height: 50,
    alignSelf: "center",
    // backgroundColor: "orange",
    paddingTop: 10,
  },
  bottomContainer: {
    height: 200,
    alignSelf: "center",
    // backgroundColor: "pink",
  },
});

export default LoginScreen;