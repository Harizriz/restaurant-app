import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, Alert } from "react-native";
import Button from "react-native-button";
import { TextInput } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      EmailValueHolder: '',
      isError: false
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Reset Password</Text>
        </View>
        <View style={styles.promptContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Email  "
              mode="outlined"
              error={this.state.isError}
              returnKeyType="done"
              style={{
                  top: 20,
                  height: 50
              }}
              onChangeText={EmailValueHolder => this.setState({EmailValueHolder})}
            />      
          </View>
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
            onPress={() => {
              
            }}
          >
            Send
          </Button>
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
    height: 90,
    alignItems: "center",
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  textInputContainer: {
    width: "75%",
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "yellow",
    // borderWidth: 1,
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
    right: 50,
    color: "blue",
    // backgroundColor: "red",
    bottom: 20
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
  icon: {
    left: 125,
    bottom: 27,
    marginHorizontal: 147,
    // backgroundColor: "yellow",
  }
});

export default ResetPasswordScreen;