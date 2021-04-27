import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import Button from "react-native-button";
import { TextInput } from 'react-native-paper'

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
  },
  promptContainer: {
    height: 90,
    alignItems: "center",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
  },
  textInputContainer: {
    width: "75%",
    flex: 1,
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
    bottom: 20
  },
  icon: {
    left: 125,
    bottom: 27,
    marginHorizontal: 147,
  }
});

export default ResetPasswordScreen;